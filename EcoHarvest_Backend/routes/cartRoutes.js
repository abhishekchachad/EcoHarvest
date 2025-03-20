// EcoHarvest_Backend/routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Get all cart items
router.get("/", cartController.getCartItems);

// Add item to cart
router.post("/", cartController.addToCart);

// Update item quantity in cart
router.put("/:id", cartController.updateCartQuantity);

// Remove item from cart
router.delete("/:id", cartController.removeCartItem);

module.exports = router;
