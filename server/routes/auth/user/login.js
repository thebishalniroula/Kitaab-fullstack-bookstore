const express = require("express");
const router = express.Router();
const passport = require("../../../strategies/local");

router.post("/", passport.authenticate("user"), (req, res) => {
  const { cartItems, email, isUser, name, _id } = req.user;
  res.status(200).json({
    status: "success",
    message: `You have been logged in as ${req.user.name}`,
    user: { cartItems, email, isUser, name, _id },
  });
});

module.exports = router;
