const express = require('express');

const { signupUser, loginUser, getUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/get-user', protect, getUser);

router.post('/login',loginUser);

router.post('/signup',signupUser);

module.exports = router;