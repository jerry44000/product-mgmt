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
