const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const valisator = require("validator");

// Schema for User
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Signup method using regular function instead of arrow function (key word this)
userSchema.statics.signup = async function (email, password) {
  // Validation email & password (validator package)
  if (!email && !password) {
    throw Error("Email and password are required");
  }
  if (!email) {
    throw Error("Email is required.");
  }
  if (!password) {
    throw Error("Password is required.");
  }
  // Validation email using method isEmail from validator package
  if (!valisator.isEmail(email)) {
    throw Error("Email is invalid.");
  }
  // Validation password using method isLength from validator package
  if (!valisator.isLength(password, { min: 8 })) {
    throw Error("Password must be at least 8 characters please.");
  }

  // Check if user already exists
  const userAlreadyExists = await this.findOne({ email });
  if (userAlreadyExists) {
    throw Error("User email already exists.");
  }
  // Generate a salt and Hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create new doc and passing email and hashed password
  const user = await this.create({
    email,
    password: hashedPassword,
  });
  return user;
};

// Login using static method
userSchema.statics.login = async function (email, password) {
  // Validation email & password input (validator package)
  if (!email && !password) {
    throw Error("Email and password are required");
  }
  if (!email) {
    throw Error("Email is required.");
  }
  if (!password) {
    throw Error("Password is required.");
  }
  // Check if user exists using email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email doesn't exists.");
  }
  // Check if password is correct and match with hashed password (user.password)
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw Error("Password is incorrect.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
