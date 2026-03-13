const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, text, html = "") {

  try {

    const info = await transporter.sendMail({
      from: `"FixoFix" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html || `<p>${text}</p>`
    });

    console.log("Email sent:", info.response);

  } catch (error) {

    console.error("Email error:", error);

  }

}

module.exports = sendEmail;