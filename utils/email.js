// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
    //service: "gmail",
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    auth: {
      user: "f36720223140e0",
      pass: "d629f80aec3569",
    },
  });
  //2) Define the eamil options

  const mailOption = {
    from: `"Hello" <quocdung@gmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3) Actually send the email

  await transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendEmail;
