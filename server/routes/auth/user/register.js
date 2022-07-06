const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

//Registering new user
router.post(
  "/",
  [
    check("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    check("name")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .contains(" ")
      .withMessage("Please enter your full name"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please must be at least 6 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const { name, email, password: plainPassword } = req.body;
    const password = await bcrypt.hash(plainPassword, 10);
    const userDB = await User.findOne({ email });
    if (userDB) {
      return res
        .status(400)
        .json({ status: "error", message: "User has already been regestered" });
    }

    const user = new User({ name, email, password });
    try {
      const newUser = await user.save();
      if (newUser) {
        return res
          .status(200)
          .json({ status: "success", message: "User regestered." });
      }
    } catch (error) {
      return res.status(400).json({ status: "error", error });
    }
  }
);

module.exports = router;
