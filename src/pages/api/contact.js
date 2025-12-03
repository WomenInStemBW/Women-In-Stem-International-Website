// src/pages/api/contact.js (for Next.js) OR create a serverless function
// If using Create React App, you'll need a separate backend

import { ContactFormEmail } from '../../emails/ContactFormEmail';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Render React component to HTML
    const emailHtml = await render(
      ContactFormEmail({ name, email, phone, subject, message })
    );

    // Create transporter (using Gmail with app password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Women in STEM" <${process.env.GMAIL_USER}>`,
      to: ['tumok@wisbw.org', 'womeninsteminternational@gmail.com'],
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
      replyTo: email,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}