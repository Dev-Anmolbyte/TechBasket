const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const { protect } = require("../middlewares/authMiddleware");

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders/my-orders
// @access  Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create an order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Cancel an order
// @route   PUT /api/orders/cancel/:id
// @access  Private
router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Ensure the logged-in user owns the order
      if (order.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: "User not authorized" });
        return;
      }

      // Check if the order can be cancelled
      if (["shipped", "delivered", "cancelled"].includes(order.status)) {
        res
          .status(400)
          .json({ message: "Order cannot be cancelled at this stage" });
        return;
      }

      order.status = "cancelled";
      await order.save();
      res.status(200).json({ message: "Order cancelled successfully", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
