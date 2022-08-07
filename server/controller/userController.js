const User = require("../models/userModel");

// Login user
const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

// Register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new user by using the signup method in the user model
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error : error.message });
  };
};

module.exports = {
  loginUser,
  registerUser,
};
