const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.use((req, res, next) => {
  if (req.user) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "please login first" });
});

//get all books
router.get("/", async (req, res) => {
  const books = await Book.find().select(
    "title price category description stock image"
  );
  res.status(200).json(books);
});

//get book by id
router.get("/:bookId", async (req, res) => {
  const id = req.params.bookId;
  const book = await Book.findById(id).populate("reviews.userId", "name email");
  res.status(200).json(book);
});

//get book by category
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  const books = await Book.find({ category });
  res.status(200).json(books);
});

module.exports = router;
