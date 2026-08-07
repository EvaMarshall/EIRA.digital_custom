import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import sanitizeHtml from "sanitize-html";
import os from "os";



dotenv.config(); // MUST come before importing transporter

import { transporter } from "./mailer";

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
  _honey?: string;
};

// --- Rate limiting middleware ---
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                   // limit each IP to 5 requests per hour
  message: { error: "Too many requests — please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const sanitize = (input: string) => {
  return sanitizeHtml(input, {
    allowedTags: [],        // remove ALL HTML tags
    allowedAttributes: {},  // remove ALL attributes
  }).trim();
};

const app = express();
app.use(cors());
app.use(express.json());

const getClientIp = (req: Request) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown"
  );
};


// --- Contact route with rate limiting ---
app.post(
  "/contact",
  contactLimiter,
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    const { name, email, message, _honey } = req.body;

    //  Sanitize incoming fields
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    //  IP logging 
    const clientIp = getClientIp(req);
    console.log("Contact form submission:", {
      ip: clientIp,
      userAgent: req.headers["user-agent"],
      time: new Date().toISOString(),
    });

    const errors: Record<string, string> = {};

    // Honeypot (bots fill this)
    if (_honey) {
      return res.status(400).json({ error: "Bot detected" });
    }

    // Name validation
    if (!safeName || safeName.trim().length === 0) {
      errors.name = "Name is required.";
    } else if (safeName.length > 200) {
      errors.name = "Name is too long.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!safeEmail || safeEmail.trim().length === 0) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(safeEmail)) {
      errors.email = "Invalid email format.";
    } else if (safeEmail.length > 200) {
      errors.email = "Email is too long.";
    }

    // Message validation
    if (!safeMessage || safeMessage.trim().length === 0) {
      errors.message = "Message is required.";
    } else if (safeMessage.length > 2000) {
      errors.message = "Message is too long.";
    }

    // If any validation errors exist, reject the request
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // --- Email sending ---
    try {
      await transporter.sendMail({
        from: `"EIRA Contact" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: safeEmail,
        subject: `New message from ${safeName}`,
        text: safeMessage,
      });

      res.json({ success: true });
    } catch (err) {
      console.error("Email error:", err);
      res.status(500).json({ error: "Email failed" });
    }
  }



);

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
