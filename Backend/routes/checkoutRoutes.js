const express = require("express");
const router = express.Router();
const { initiateCheckout } = require("../controllers/checkoutController");
const { protect } = require("../middlewares/authMiddleware");
const Order =require("../models/OrderModel")


router.post("/initiate", protect, initiateCheckout);
router.post("/checkout", protect, async (req, res) => {
  console.log("🛒 Checkout request received");
  console.log("User:", req.user?._id);
  console.log("Request body:", req.body);

  const { items, billingInfo, totals } = req.body;

  if (!items || items.length === 0) {
    console.log("❌ No order items found");
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const order = new Order({
      user: req.user._id,
      items,
      billingInfo,
      totals,
    });

    const createdOrder = await order.save();
    console.log("✅ Order created:", createdOrder._id);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("💥 Order creation failed:", error.message);
    res.status(500).json({ message: "Order creation failed" });
  }
});


module.exports = router;
