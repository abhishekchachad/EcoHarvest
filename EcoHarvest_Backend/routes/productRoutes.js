const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  softDeleteProduct,
  upload,
  getProductById
} = require("../controllers/productController");

const router = express.Router();
const cors = require('cors');
app.use(cors({
  origin: 'https://ecoharvestbackend.vercel.app'
}));

router.get("/", getProducts);
router.get("/:product_id", getProductById);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.put("/delete/:id", softDeleteProduct);

module.exports = router;
