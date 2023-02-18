const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    createAccount
} = require('../controllers/accountController');

router.route('/').get(protect, admin, getAccounts).post(protect, admin, createAccount);
router.route('/:id').get(protect, admin, getAccountById).delete(protect, admin, deleteAccount).put(protect, admin, updateAccount);

module.exports = router;