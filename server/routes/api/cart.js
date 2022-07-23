const User = require("../../models/User");
const express = require("express");
const router = express.Router();
const checkIfItemExistsInCart = require("../../helper/checkIfItemExistsInCart");
const Book = require("../../models/Book");

router.use((req, res, next) => {
  if (req.user && req.user?.isUser) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "Please login first." });
});

//add to cart
router.post("/add/:id", async (req, res) => {
  const bookId = req.params.id;
  const user = req.user;
  const book = await Book.findById(bookId);
  // const { exists, index } = checkIfItemExistsInCart(req.user.cartItems, bookId);
  // if (exists) {
  //   console.log("item exists");
  //   user.cartItems[index].quantity++;
  // } else user.cartItems.push({ book, quantity: 1 });

  user.cartItems.push({
    bookId,
    image: book.image,
    title: book.title,
    price: book.price,
    quantity: 1,
  });
  try {
    const userDb = await User.findByIdAndUpdate(user.id, user);
    if (userDb) {
      return res.status(200).json({
        status: "success",
        message: "Item added to cart successfully",
      });
    } else
      return res.status(400).json({
        status: "error",
        message: "Item couldnot be added to cart",
      });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
});

//remove from cart
router.delete("/remove/:id", async (req, res) => {
  const bookId = req.params.id;
  const user = req.user;

  const { exists, index } = checkIfItemExistsInCart(req.user.cartItems, bookId);
  if (exists) {
    user.cartItems.splice(index, 1);
  } else
    return res.status(400).json({
      status: "error",
      message: "Item doesn't exist in the cart",
    });

  try {
    const userDb = await User.findByIdAndUpdate(user.id, user);
    if (userDb) {
      return res.status(200).json({
        status: "success",
        message: "Item removed from cart successfully",
      });
    } else
      return res.status(400).json({
        status: "error",
        message: "Item couldnot be removed from cart",
      });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
});

module.exports = router;
