import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou 'outlook', 'hotmail', 'yahoo', ou un host SMTP personnalisé
  auth: {
    user: process.env.MAIL_USER,      // ex : monadresse@gmail.com
    pass: process.env.MAIL_PASS,      // mot de passe ou "App Password"
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Cabinet Psychologue" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('✉️ Email envoyé :', info.response);
  } catch (err) {
    console.error('❌ Erreur envoi email :', err);
  }
};
