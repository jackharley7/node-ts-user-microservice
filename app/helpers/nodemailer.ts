import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import config from '../config/configuration';

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'jackharley7@gmail.com',
    pass: 'Jack#20369',
  },
}));

export const send = async (
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string,
) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
};
