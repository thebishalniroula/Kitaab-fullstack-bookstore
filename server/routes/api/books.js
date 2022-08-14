const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");
const mongoose = require("mongoose");
router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "please login first" });
});

//get all books
// ----> api/books/
router.get("/popularnow", async (req, res) => {
  const books = await Book.find({ isPopularNow: true });
  return res.status(200).json({ status: "success", message: books });
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ status: "success", message: books });
  } catch (error) {
    return res.status(200).json({ status: "error", message: error });
  }
});

//get book by id
router.get("/:bookId", async (req, res) => {
  const id = req.params.bookId;
  if (mongoose.isValidObjectId(id)) {
    const book = await Book.findById(id).populate(
      "reviews.userId",
      "name email"
    );
    return res.status(200).json({ status: "success", message: book });
  } else {
    return res.json({
      status: "error",
      message: "Please enter a valid objexctID",
    });
  }
});

//get book by category
router.get("/category/:category", async (req, res) => {
  const category = req.params.category.toUpperCase();
  const books = await Book.find({ category });
  return res.status(200).json({ status: "success", message: books });
});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  try {
    const books = await Book.find({ title: new RegExp(query, "i") });
    return res.status(200).json({ status: "success", message: books });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ status: "error", message: err.message });
  }
});

module.exports = router;
