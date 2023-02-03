const express = require('express');
const router = express.Router();
const { login, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.route('/login').post(login);
router.route('/profile').get(protect, getProfile);
router.route('/logout').get(logout);

module.exports = router;
