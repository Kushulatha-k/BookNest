const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
  stock: Number,
   image: String
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
