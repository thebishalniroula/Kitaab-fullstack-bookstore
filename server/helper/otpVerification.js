const nodemailer = require("nodemailer");
require("dotenv").config({
  path: "../.env",
});
module.exports.generateOtp = () => {
  let OTP = parseInt(Math.random() * 100000);
  while (OTP.toString().length < 5) {
    OTP = parseInt(Math.random() * 100000);
  }
  console.log("OTP", OTP);
  return OTP;
};
//sengin otp
const sendotp = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages");
    }
  });
  try {
    await transporter.sendMail({
      from: `"OTP verification" <${process.env.EMAIL}>`,
      to: email,
      subject: "Please verify your OTP",
      text: "Please use this otp to verify its you",
      html: `<div style="min-height: 200px; background-color: #3d5880; color: white; align-text: center; padding: 10%"><h1>Please use this OTP to sign in as admin</h1>
      <h2>Your OTP: <span style="background-color:#525c6b">${otp}</span></h2></div>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.sendotp = sendotp;
