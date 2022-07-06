const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("user"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: `You have been logged in as ${req.user.name}`,
  });
});

module.exports = router;
