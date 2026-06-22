import "server-only";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendResetEmail(
  email: string,
  resetLink: string
) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h2>Reset Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">
        Reset Password
      </a>
    `,
  });
}