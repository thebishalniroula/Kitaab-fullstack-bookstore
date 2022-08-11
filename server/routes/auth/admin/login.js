const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateOtp, sendotp } = require("../../../helper/otpVerification");
const Admin = require("../../../models/Admin");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const adminDB = await Admin.findOne({ email });
  if (adminDB) {
    const isValid = await bcrypt.compare(password, adminDB.password);
    if (isValid) {
      const otp = generateOtp();
      req.session.otp = otp.toString();
      sendotp(email, otp);
      return res.status(200).json({
        status: "success",
        message: `Please verify your otp to login`,
      });
    } else
      return res.status(400).json({
        status: "error",
        message: "Please recheck your password.",
      });
  } else
    return res.status(400).json({
      status: "error",
      message: "Please recheck your admin email.",
    });
});

router.post(
  "/verify-otp",
  (req, res, next) => {
    const { otp: otpReceived } = req.body;

    const otpSent = req.session.otp;
    if (otpSent === otpReceived) {
      return next();
    } else
      res.status(400).json({
        status: "error",
        message: `OTP doesnt match. Please retry.`,
      });
  },
  passport.authenticate("admin"),
  (req, res) => {
    const { email, isAdmin, name, _id } = req.user;

    res.status(200).json({
      status: "success",
      user: { name, email, isAdmin, _id },
      message: `You have been logged in as admin.`,
    });
  }
);

router.post("/resend-otp", (req, res, next) => {
  const { email, password } = req.body;
  const otp = generateOtp();
  req.session.otp = otp.toString();
  sendotp(email, otp);
  return res.status(200).json({
    status: "success",
    message: `OTP resent successfully`,
  });
});

module.exports = router;
