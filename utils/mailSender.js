const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function (email, title, body) {
  try {
    // Development mode: just log to console instead of sending email
    const isDevelopment = process.env.NODE_ENV !== 'production' || !process.env.MAIL_USER;

    if (isDevelopment) {
      console.log('\n=========== EMAIL (Development Mode) ===========');
      console.log('To:', email);
      console.log('Subject:', title);
      console.log('OTP:', body);
      console.log('===============================================\n');

      // Return a mock successful response
      return {
        messageId: 'dev-mode-' + Date.now(),
        response: 'Development mode - email logged to console'
      };
    }

    // Production mode: send actual email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS     //app specific password
      }
    });

    let info = await transporter.sendMail({
      from: "Indore Municipal Corporation",
      to: email,
      subject: title,
      html: body,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    //TODO: handle error here
    console.error(error.message);
    throw new Error('Failed to send OTP');
  }
};

module.exports = mailSender;