const Cart = require("../models/Cart");
const Product = require("../models/Product"); // required to populate product data

// GET /api/cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId"
  );
  res.json(cart?.items || []);
};

// POST /api/cart

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    // ✅ If item exists, increase the quantity
    existingItem.quantity += quantity;
  } else {
    // ✅ If new item, push to cart
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  await cart.populate("items.productId");

  res.status(201).json(cart.items);
};


// PUT /api/cart/:productId
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.productId.toString() === productId);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;

  await cart.save();
  await cart.populate("items.productId");

  res.json(cart.items);
};

// DELETE /api/cart/:productId
const removeCartItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

  await cart.save();
  await cart.populate("items.productId");

  res.json(cart.items);
};

// DELETE /api/cart
const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user._id });
  res.json([]);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
