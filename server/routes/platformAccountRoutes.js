const express = require('express');
const router = express.Router();
const { getPlatformAccounts, getPlatformAccountById, createPlatformAccount, updatePlatformAccount, deletePlatformAccount } = require('../controllers/platformAccountController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPlatformAccounts).post(protect, admin, createPlatformAccount);
router.route('/:id').get(getPlatformAccountById).put(protect, admin, updatePlatformAccount).delete(protect, admin, deletePlatformAccount);

module.exports = router;