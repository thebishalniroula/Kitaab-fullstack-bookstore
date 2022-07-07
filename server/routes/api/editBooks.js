const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Book = require("../../models/Book");

router.use((req, res, next) => {
  if (req.user && req.user?.isAdmin) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "please login as an admin first" });
});

const validationMiddlewares = [
  check("title").notEmpty().withMessage("Title cannot be empty"),
  check("price")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isNumeric()
    .not()
    .withMessage("Price must be a numeric value in Rupees"),
  check("category")
    .matches(
      /\b(?:"EDUCATIONAL"||"SELFHELP"||"NOVELS"||"FINANCE"||"COMICS"||"UNCATEGORISED")\b/
    )
    .withMessage(
      "Category must be one of the following: EDUCATIONAL, SELFHELP, NOVELS, FINANCE, COMICS, UNCATEGORISED"
    ),
  check("stock")
    .notEmpty()
    .withMessage("Please mention available stocks of book.")
    .isNumeric()
    .not()
    .withMessage("Stock value must be numeric"),
];

//add a new book
router.post("/add", validationMiddlewares, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { title, price, category, description, image, reviews, stock } =
    req.body;

  const book = new Book(req.body);
  try {
    const bookDb = await book.save();
    res.status(200).json(bookDb);
  } catch (error) {
    res.status(400).json({ status: "error", message: error });
  }
});

//edit an existing book
const existingValidationMiddlewares = [
  check("price")
    .optional({ nullable: true })
    .isNumeric()
    .not()
    .withMessage("Price must be a numeric value."),
  check("category")
    .optional({ nullable: true })
    .matches(
      /\b(?:"EDUCATIONAL"||"SELFHELP"||"NOVELS"||"FINANCE"||"COMICS"||"UNCATEGORISED",)\b/
    )
    .withMessage(
      "Category must be one of the following: EDUCATIONAL, SELFHELP, NOVELS, FINANCE, COMICS, UNCATEGORISED"
    ),
  check("stock")
    .optional({ nullable: true })
    .isNumeric()
    .not()
    .withMessage("Stock value must be numeric"),
];

router.patch(
  "/update/:bookId",
  existingValidationMiddlewares,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const id = req.params.bookId;
    try {
      const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
      console.log(book);
      if (book) {
        res.status(200).json(book);
      } else
        return res
          .status(400)
          .send({ status: "error", message: "Book not found" });
    } catch (error) {
      res.status(500).send({ status: "error", message: error });
    }
  }
);

//get book by category
router.delete("/:bookId", async (req, res) => {
  const id = req.params.bookId;
  const books = await Book.findByIdAndDelete({ id });
  res.status(200).json(books);
});

module.exports = router;
