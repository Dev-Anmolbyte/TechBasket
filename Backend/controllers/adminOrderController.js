const Order = require("../models/OrderModel");
const Product = require("../models/Product");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      // ✅ Use stored price in each item instead of recalculating
      const total = (order.items || []).reduce((sum, item) => {
        return sum + (item.price || 0) * (item.quantity || 0);
      }, 0);

      return {
        ...order.toObject(),
        totals: { total },
        customerName: order.user?.name || "Customer",
      };
    });

    res.json(formattedOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
};






exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "price"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const oldStatus = order.status;
    const newStatus = req.body.status || order.status;

    // Calculate order total (safe array)
    let orderTotal = (order.items || []).reduce((sum, item) => {
      let price = item.price ?? item.product?.price ?? 0;
      if (price > 0 && price < 200) {
        price = price * USD_TO_INR; // USD → INR conversion
      }
      return sum + price * (item.quantity || 0);
    }, 0);

    // Simulated stored totalRevenue
    const Stats = require("../models/Stats");
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({ totalRevenue: 0 });
    }

    // Adjust totalRevenue based on status change
    if (oldStatus !== "cancelled" && newStatus === "cancelled") {
      stats.totalRevenue -= orderTotal;
    } else if (oldStatus === "cancelled" && newStatus !== "cancelled") {
      stats.totalRevenue += orderTotal;
    }

    order.status = newStatus;
    await order.save();
    await stats.save();

    res.json({ order, totalRevenue: stats.totalRevenue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
