// email.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, text, html = "") {
  try {

    const response = await resend.emails.send({
      from: "FixoFix <noreply@fixofix.com>",   // temporary sender
      to: to,
      subject: subject,
      text: text,
      html: html || `<p>${text}</p>`
    });

    console.log("✅ Email sent:", response);

  } catch (error) {

    console.error("❌ Email sending error:", error);

  }
}

module.exports = sendEmail;