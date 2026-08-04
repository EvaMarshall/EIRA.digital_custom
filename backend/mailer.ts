import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.infomaniak.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER, // contact@eira.digital
    pass: process.env.SMTP_PASS, // your generated SMTP password
  },
});
