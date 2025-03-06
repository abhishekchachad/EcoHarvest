const express = require("express");
const { getProducts, addProduct, updateProduct, softDeleteProduct, upload } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.put("/delete/:id", softDeleteProduct); // Soft delete route

module.exports = router;
