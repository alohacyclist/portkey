const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      name: 'port-key.herokuapp.com',
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PW,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_ADD,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent.');
  } catch (error) {
    console.log(error, 'Sending E-Mail failed.');
  }
};

module.exports = sendEmail;