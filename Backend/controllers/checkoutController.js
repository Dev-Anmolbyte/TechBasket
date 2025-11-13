const Order = require("../models/OrderModel");
const Product = require("../models/Product");

const USD_TO_INR = 87.7;

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      // Calculate total in USD
      let totalUSD = order.totals?.total;
      if (!totalUSD) {
        totalUSD = order.items.reduce((sum, item) => {
          const priceUSD = item.price || item.product?.price || 0;
          return sum + priceUSD * item.quantity;
        }, 0);
      }

      // Convert total & items to INR
      const totalINR = totalUSD * USD_TO_INR;

      return {
        ...order.toObject(),
        totals: { total: totalINR },
        billingInfo: order.billingInfo || {},
        items: order.items.map((item) => ({
          ...item.toObject(),
          price: (item.price || item.product?.price || 0) * USD_TO_INR,
          name: item.name || item.product?.name,
          image: item.image || item.product?.image,
        })),
      };
    });

    res.json(formattedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/checkout/initiate
exports.initiateCheckout = async (req, res) => {
  try {
    const { productId, quantity, billingInfo } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create order
    const order = await Order.create({
      user: req.user._id, // assuming req.user is set by auth middleware
      items: [
        {
          product: productId,
          name: product.name,
          quantity,
          image: product.image,
          price: product.price,
        },
      ],
      billingInfo: billingInfo, // ✅ Now matches your frontend expectation
      totals: { total: totalPrice },
    });

    res.status(201).json({
      success: true,
      message: "Checkout initiated",
      order,
    });
  } catch (err) {
    console.error("Checkout initiation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
