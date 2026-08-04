import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { transporter } from "./mailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await transporter.sendMail({
      from: `"EIRA Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
