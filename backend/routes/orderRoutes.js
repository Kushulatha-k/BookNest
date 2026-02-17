const express = require("express");
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// PLACE ORDER
router.post("/", protect, async (req, res) => {
  const order = await Order.create({
    user: req.user.id,
    books: req.body.books,
    totalPrice: req.body.totalPrice
  });

  res.json(order);
});

// GET USER ORDERS
router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("books.book");

  res.json(orders);
});

module.exports = router;
