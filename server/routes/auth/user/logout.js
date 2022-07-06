const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    return req.logout(req.user, (err) => {
      if (err) return;
      res.json({ status: "success", message: "You have been logged out" });
    });
  } else
    return res.status(400).json({
      status: "error",
      message: "Cannot log out if you are not logged in",
    });
});

module.exports = router;
