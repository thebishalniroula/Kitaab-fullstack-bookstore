const express = require("express");
const Book = require("../../models/Book");
const router = express.Router();

router.use((req, res, next) => {
  if (req.user && req.user?.isUser) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "Please login first." });
});

router.post("/add", async (req, res) => {
  const { id, stars, review } = req.body;
  try {
    const bookDB = await Book.findById(id);
    const newReview = {
      userId: req.user._id,
      stars,
      review,
    };
    bookDB.reviews.unshift(newReview);
    try {
      await bookDB.save();
      res.json({ status: "success", message: newReview });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
