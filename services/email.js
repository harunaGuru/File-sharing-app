const mailer = require("nodemailer");
require("dotenv").config;

const HOST = process.env.SMTP_HOST_URL;
const PORT = process.env.SMTP_PORT;
const USER = process.env.MAIL_USER;
const PASSWORD = process.env.MAIL_PASSWORD;

const sendEmail = async ({ from, to, subject, text, html }) => {
  try {
    let transporter = mailer.createTransport({
      host: HOST,
      port: PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `eazyShare <${from}>`,
      to: to,
      subject: subject,
      text:  text,
      html: html,
    });
    console.log("Email sent successfully")
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;