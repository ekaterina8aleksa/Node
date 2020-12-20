require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (email, token) => {
  try {
    const msg = {
      to: `${email}`, // Change to your recipient
      from: 'ekaterina.palad87@gmail.com', // Change to your verified sender
      subject: 'GoIT NDJS-20 verification account',
      text: 'want to get used to NodeJS',
      html: `<a href="${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/auth/verify/${token}">Verify your email, please!!!</a>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };