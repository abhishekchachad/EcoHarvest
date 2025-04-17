const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCartItems);
router.post("/", cartController.addToCart);
router.put("/:productId", cartController.updateCartQuantity);
router.delete("/:productId", cartController.removeCartItem);

module.exports = router;
