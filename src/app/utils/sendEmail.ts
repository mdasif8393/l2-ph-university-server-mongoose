import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'md.asif.8393@gmail.com',
      pass: 'ivqm pkol rczb bbzs',
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: 'md.asif.8393@gmail.com', // sender address
    to, // list of receivers
    subject: 'Change your Password', // Subject line
    text: 'Reset your password within 10 minutes...', // plain text body
    html, // html body
  });
};
