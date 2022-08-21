const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Get the authotization header value
  const { authorization } = req.headers;
  // Check if headers has value
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Get the token from the authorization header with medthod split
  const token = authorization.split(" ")[1];

  try {
    // Get the ID from token by verifying it & pass token and secret key
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    // Find user in database
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAuth;
