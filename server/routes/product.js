const express = require("express");
const Product = require("../models/ProductModel");
const {
  createProduct,
  getAllProducts,
  getOneProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// Require authentication for all routes before they are accessed
router.use(requireAuth);

// Get all Products
router.get("/", getAllProducts);

// Get a single Product
router.get("/:id", getOneProductById);

// Post a product
router.post("/", createProduct);

// Update a product
router.patch("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
