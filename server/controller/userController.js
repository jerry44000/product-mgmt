const User = require("../models/userModel");
const jtw = require("jsonwebtoken");

// Function create Token with jsonwebtoken package
const createToken = (_id) => {
  // Create a token with sign method passing 3 arguments id, secretKey & expiresIn
  return jtw.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Log the user by using the login method in the user model
    const user = await User.login(email, password);
    // Create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register a new user 
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new user by using the signup method in the user model
    const user = await User.signup(email, password);
    // Create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
