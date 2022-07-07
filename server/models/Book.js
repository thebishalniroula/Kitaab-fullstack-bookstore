const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "EDUCATIONAL",
      "SELFHELP",
      "NOVELS",
      "FINANCE",
      "COMICS",
      "UNCATEGORISED",
    ],
    default: "UNCATEGORISED",
  },
  description: {
    type: String,
    default: "Description unavailable",
  },
  image: {
    type: String,
    default: "/images/books/default.png",
  },
  reviews: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
