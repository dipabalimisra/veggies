const express = require('express');
const { signup, signin, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // A middleware to protect routes

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', protect, getProfile); // Protect this route

module.exports = router;