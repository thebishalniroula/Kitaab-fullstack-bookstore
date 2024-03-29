const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("here");
  if (req.user) {
    const { cartItems, email, isUser, name, _id } = req.user;
    return res.json({
      status: "success",
      message: "You are logged in.",
      user: { cartItems, email, isUser, name, _id },
    });
  } else
    return res.status(400).json({
      status: "error",
      message: "You are not logged in.",
    });
});
module.exports = router;
