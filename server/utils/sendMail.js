const nodemailer = require("nodemailer");
const createError = require("./createError");

const sendMail = async ({ email, html, subject }) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: '"DigitalShop" <no-reply@DigitalShop.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });

    return info;
  } catch (error) {
    throw createError(500, "Error at send mail");
  }
};

module.exports = sendMail;
