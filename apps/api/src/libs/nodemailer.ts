import nodemailer from 'nodemailer';

const host = process.env.MAIL_HOST;
const port = Number(process.env.MAIL_PORT);
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASSWORD;

export const sendMail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });
  await transporter.sendMail({
    from: `GraphQL API Sample for EC <${user}>`,
    to,
    subject,
    text,
  });
};
