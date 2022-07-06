const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  cartItems: {
    type: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
  isUser: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
