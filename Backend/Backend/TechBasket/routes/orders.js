
const express = require('express');
const router = express.Router();
const Order = require('../Model/order');   
const Product = require('../Model/product'); 
const authenticateUser = require('../middleware/auth'); 

//POST /api/orders - Place a new order (JWT auth, use req.user._id)
router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { items, billingInfo, paymentInfo, totals } = req.body;
    console.log("DEBUG body:", req.body);

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or missing items array" });
    }
    // Validate items and check stock
    for (let item of items) {
      const product = await Product.findById(item.productId || item.id);
      if (!product) return res.status(400).json({ success: false, message: `Product ${item.name} not found` });
      if (product.hasOwnProperty('stockQuantity') && product.stockQuantity < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${item.name}` });
      }
      if (!product.inStock)
         return res.status(400).json({ success: false, message: `Product ${item.name} is out of stock` });
    }
    // Mask card
    if (paymentInfo.cardNumber && !paymentInfo.cardNumber.includes('*')) {
      const digits = paymentInfo.cardNumber.replace(/\D/g, '');
      paymentInfo.cardNumber = '**** **** **** ' + digits.slice(-4);
    }
    delete paymentInfo.cvv;
    delete paymentInfo.expiryDate;
    // Use id from token
    const order = new Order({
      userId: req.user._id,
      items: items.map(item => ({
        productId: item.productId || item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      billingInfo,
      paymentInfo,
      totals,
      status: 'pending',
      orderDate: new Date()
    });
    await order.save();
    // Optionally decrement product stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.productId || item.id,
        { $inc: { stockQuantity: -item.quantity } },
        { new: true }
      );
    }
    res.status(201).json({success: true, message: "Order placed successfully", order});
  } catch (err) {
    res.status(500).json({ success: false, message: "Error placing order", error: err.message });
  }
});

// GET /api/orders - User's order history (JWT auth)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching orders', error: err.message });
  }
});

module.exports = router;
