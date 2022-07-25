const express = require("express");
const router = express.Router();
const Books = require("../../models/Book");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const mongoose = require("mongoose");
router.use((req, res, next) => {
  if (req.user && req.user?.isUser) {
    return next();
  }
  return res
    .status(400)
    .json({ status: "error", message: "Please login first." });
});

router.post("/", async (req, res) => {
  const orders = req.body;
  const ids = orders.map((book) => {
    return book.id;
  });
  const searchIds = ids.map((id) => mongoose.Types.ObjectId(id));
  const booksDB = await Books.find({
    _id: {
      $in: searchIds,
    },
  });

  const booksDBwithQuantity = booksDB.map((book) => {
    orders.forEach((item) => {
      if (book._id.toString() === item.id) {
        book["quantity"] = item.quantity;
      }
    });
    return book;
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: booksDBwithQuantity.map((item) => {
        return {
          price_data: {
            currency: "npr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-canceled",
    });
    const url = session.url;
    res.json({ status: "success", message: { url } });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
