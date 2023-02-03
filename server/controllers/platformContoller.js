const asyncHandler = require('express-async-handler');
const Platform = require('../models/platformModel');

// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
const getPlatforms = asyncHandler(async (req, res) => {
    const platforms = await Platform.find({});

    res.json(platforms);
});

// @desc    Get platform by ID
// @route   GET /api/platforms/:id
// @access  Public
const getPlatformById = asyncHandler(async (req, res) => {
    const platform = await Platform.findById(req.params.id);

    if (platform) {
        res.json(platform);
    } else {
        res.status(404);
        throw new Error('Platform not found');
    }
});

// @desc    Create a platform
// @route   POST /api/platforms
// @access  Private
const createPlatform = asyncHandler(async (req, res) => {
    if ( req.body.name && req.body.icon ) {
        const platform = new Platform({
            name: req.body.name,
            icon: req.body.icon,
        });

        const createdPlatform = await platform.save();
        res.status(201).json(createdPlatform);
    } else {
        res.status(400);
        throw new Error('Invalid platform data');
    }
});

// @desc    Update a platform
// @route   PUT /api/platforms/:id
// @access  Private
const updatePlatform = asyncHandler(async (req, res) => {
    const platform = await Platform.findById(req.params.id);

    if (platform) {
        platform.name = req.body.name || platform.name;
        platform.icon = req.body.icon || platform.icon;

        const updatedPlatform = await platform.save();
        res.json(updatedPlatform);
    } else {
        res.status(404);
        throw new Error('Platform not found');
    }
});

// @desc    Delete a platform
// @route   DELETE /api/platforms/:id
// @access  Private
const deletePlatform = asyncHandler(async (req, res) => {
    const platform = await Platform.findById(req.params.id);

    if (platform) {
        await platform.remove();
        res.json({ message: 'Platform removed' });
    } else {
        res.status(404);
        throw new Error('Platform not found');
    }
});

module.exports = {
    getPlatforms,
    getPlatformById,
    createPlatform,
    updatePlatform,
    deletePlatform,
};

