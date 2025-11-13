const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: { type: Number, required: true },
  image: String,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  description: String,
  specifications: {
    cores: String,
    threads: String,
    baseClockSpeed: String,
    boostClockSpeed: String,
    socket: String,
    tdp: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
