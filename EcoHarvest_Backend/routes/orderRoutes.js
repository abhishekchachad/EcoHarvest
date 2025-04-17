// EcoHarvest_Backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Get all orders
router.get("/", orderController.getAllOrders);

// Get a single order by ID
router.get("/:id", orderController.getOrderById);

// Place an order
router.post("/", orderController.placeOrder);

module.exports = router;
