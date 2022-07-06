const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log(req.user);
  if (req.user && req.user?.isUser()) next();
  else
    return res
      .status(400)
      .json({ status: "error", msg: "Please log in first" });
});

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(`<h1>Welcome to the dashboard ${req.user.name.split(" ")[0]}</h1>`);
});

module.exports = router;
