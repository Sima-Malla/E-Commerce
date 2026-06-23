const express = require("express");
const router = express.Router();
const cartProductModel = require("../models/cartProduct");
const productModel = require("../models/productModel");

// GET all orders with product details
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await cartProductModel
      .find()
      .populate("productId") // populate product data
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      const product = order.productId || {};
      return {
        _id: order._id,
        productName: product.productName || "N/A",
        brandName: product.brandName || "",
        price: product.price || 0,
        sellingPrice: product.sellingPrice || 0,
        quantity: order.quantity,
        userId: order.userId,
        createdAt: order.createdAt,
      };
    });

    res.json({ success: true, data: formattedOrders });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});

module.exports = router;
