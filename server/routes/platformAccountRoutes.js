const express = require('express');
const router = express.Router();
const { getPlatformaccounts, getPlatformaccountById, createPlatformaccount, updatePlatformaccount, deletePlatformaccount } = require('../controllers/platformAccountController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPlatformaccounts).post(protect, admin, createPlatformaccount);
router.route('/:id').get(getPlatformaccountById).put(protect, admin, updatePlatformaccount).delete(protect, admin, deletePlatformaccount);

module.exports = router;