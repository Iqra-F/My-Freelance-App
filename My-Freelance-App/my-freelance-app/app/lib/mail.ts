// lib/mail.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendWelcomeEmail(to: string, name: string) {
  await transporter.sendMail({
    from: `"Job Portal" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Welcome to Our Job Platform!',
    html: `<p>Hello <strong>${name}</strong>,</p>
           <p>Thanks for signing up. Start applying or posting jobs right away!</p>
           <p>Regards,<br/>Team Job Portal</p>`,
  });
}
