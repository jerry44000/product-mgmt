const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// GET all Products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// GET a single Product
const getOneProductById = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const product = await Product.findById(id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  } else {
    res.status(200).json(product);
  }
};

// POST a product (create)
const createProduct = async (req, res) => {
  // req.body from schema
  const { title, price, quantity, description } = req.body;

  // Check if all fields are filled
  let requiredFields = [];
  if (!title) requiredFields.push("title");
  if (!price) requiredFields.push("price");
  if (!quantity) requiredFields.push("quantity");
  if (!description) requiredFields.push("description");
  
  try {
    const product = await Product.create({
      title,
      price,
      quantity,
      description,
    });
    res.status(200).json(product);
  } catch (err) {
    // If the array is not empty, return error with message
    if (requiredFields.length > 0) {
      return res.status(400).json({ error: "Missing required fields:" + " " + requiredFields }); 
    }
  }
};

// UPDATE a product (by id)
const updateProduct = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  // Check if product exists
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  } else {
    res.status(200).json(product);
  }
};

// DELETE a product (by id)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const product = await Product.findOneAndDelete({ _id: id });

  // Check if product exists
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  } else {
    res.status(200).json(product);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getOneProductById,
  deleteProduct,
  updateProduct,
};
