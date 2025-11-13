const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const productCtrl = require("../controllers/adminProductController");
const orderCtrl = require("../controllers/adminOrderController");
const userCtrl = require("../controllers/adminUserController");

// ✅ Products
router.get("/products", protect, adminOnly, productCtrl.getProducts);
router.post("/products", protect, adminOnly, productCtrl.createProduct);
router.put("/products/:id", protect, adminOnly, productCtrl.updateProduct);
router.delete("/products/:id", protect, adminOnly, productCtrl.deleteProduct);

// ✅ Orders
router.get("/orders", protect, adminOnly, orderCtrl.getOrders);
router.put("/orders/:id", protect, adminOnly, orderCtrl.updateOrderStatus);

// ✅ Users
router.get("/users", protect, adminOnly, userCtrl.getUsers);
router.delete("/users/:id", protect, adminOnly, userCtrl.deleteUser);

module.exports = router;
