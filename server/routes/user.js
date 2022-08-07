const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controller/userController');

// Login
router.post('/login', loginUser);


// Register
router.post('/register', registerUser);



module.exports = router;