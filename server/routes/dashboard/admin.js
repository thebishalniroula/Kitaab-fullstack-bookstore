const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.user && req.user?.isAdmin) next();
  else
    return res
      .status(400)
      .json({ status: "error", msg: "Please log in as an admin first." });
});

router.get("/", (req, res) => {
  console.log(req.user);
  res.send(`<h1>Welcome to the dashboard admin</h1>`);
});

module.exports = router;
