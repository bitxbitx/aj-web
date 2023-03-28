const express = require('express');
const router = express.Router();
const { getPlatforms, getPlatformById, createPlatform, updatePlatform, deletePlatform } = require('../controllers/platformController');
const { protect, admin } = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/assets');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

router.route('/').get(getPlatforms).post(protect, upload.single('icon'), createPlatform);
router.route('/:id').get(getPlatformById).put(protect, upload.single('icon'), updatePlatform).delete(protect, deletePlatform);

module.exports = router;