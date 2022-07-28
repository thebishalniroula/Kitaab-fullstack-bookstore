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
    const userReviews = bookDB.reviews.filter((review) => {
      if (review.userId === req.user._id) {
        return true;
      }
    });
    if (userReviews.length === 0) {
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
    } else
      return res.json({
        status: "error",
        message: "User has already posted a review",
      });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
router.patch("/edit", async (req, res) => {
  const { id, stars, review } = req.body;
  try {
    const bookDB = await Book.findById(id);
    const userReviews = bookDB.reviews.filter((review) => {
      if (review.userId === req.user._id) {
        return true;
      }
    });
    if (userReviews.length > 0) {
      const newReview = {
        userId: req.user._id,
        stars: stars || userReviews[0].stars,
        review: review || userReviews[0].review,
      };
      bookDB.reviews.map((review) => {
        if (review.userId === req.user._id) {
          review = newReview;
        }
      });
      try {
        await bookDB.save();
        res.json({ status: "success", message: newReview });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    } else
      return res.json({
        status: "error",
        message: "Please post a review before editing.",
      });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
