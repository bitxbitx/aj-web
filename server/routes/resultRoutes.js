const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getResults,
    getResultById,
    deleteResult,
    createResult,
    createMultipleResults
} = require('../controllers/resultController');

router.route('/').get(protect, admin, getResults).post(protect, admin, createResult);
router.route('/multiple').post(protect, admin, createMultipleResults);
router.route('/:id').get(protect, admin, getResultById).delete(protect, admin, deleteResult);

module.exports = router;