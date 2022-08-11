const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    const { email, isAdmin, name, _id } = req.user;
    return res.json({
      status: "success",
      message: "You are logged in.",
      user: { name, email, isAdmin, _id },
    });
  } else
    return res.status(400).json({
      status: "error",
      message: "You are not logged in.",
    });
});
module.exports = router;
