const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    login, 
    register,
    getProfile, 
    updateProfile,
    deleteAccount,
    getNewAccessToken,
    logout 
} = require('../controllers/authController');


router.route('/login').post(login);
router.route('/register').post(register);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/:id').delete(protect, deleteAccount);
router.route('/refresh-token').get(protect, getNewAccessToken);
router.route('/logout').get(protect, logout);

module.exports = router;
