const asyncHandler = require('express-async-handler');
const PlatformAccount = require('../models/platformAccountModel');

// @desc    Get all platform accounts
// @route   GET /api/platformAccounts
// @access  Public
const getPlatformAccounts = asyncHandler(async (req, res) => {
    const platformAccounts = await PlatformAccount.find({});

    res.json(platformAccounts);
});

// @desc    Get platform account by ID
// @route   GET /api/platformAccounts/:id
// @access  Public
const getPlatformAccountById = asyncHandler(async (req, res) => {
    const platformAccount = await PlatformAccount.findById(req.params.id);

    if (platformAccount) {
        res.json(platformAccount);
    } else {
        res.status(404);
        throw new Error('Platform account not found');
    }
});

// @desc    Create a platform account
// @route   POST /api/platformAccounts
// @access  Private
const createPlatformAccount = asyncHandler(async (req, res) => {
    if ( req.body.platform && req.body.account && req.body.username ) {
        const platformAccount = new PlatformAccount({
            platform: req.body.platform,
            account: req.body.account,
            username: req.body.username,
        });

        const createdPlatformAccount = await platformAccount.save();
        res.status(201).json(createdPlatformAccount);
    } else {
        res.status(400);
        throw new Error('Invalid platform account data');
    }
});

// @desc    Update a platform account
// @route   PUT /api/platformAccounts/:id
// @access  Private
const updatePlatformAccount = asyncHandler(async (req, res) => {
    const platformAccount = await PlatformAccount.findById(req.params.id);

    if (platformAccount) {
        platformAccount.platform = req.body.platform || platformAccount.platform;
        platformAccount.account = req.body.account || platformAccount.account;
        platformAccount.username = req.body.username || platformAccount.username;

        const updatedPlatformAccount = await platformAccount.save();
        res.json(updatedPlatformAccount);
    } else {
        res.status(404);
        throw new Error('Platform account not found');
    }
});

// @desc    Delete a platform account
// @route   DELETE /api/platformAccounts/:id
// @access  Private
const deletePlatformAccount = asyncHandler(async (req, res) => {
    const platformAccount = await PlatformAccount.findById(req.params.id);

    if (platformAccount) {
        await platformAccount.remove();
        res.json({ message: 'Platform account removed' });
    } else {
        res.status(404);
        throw new Error('Platform account not found');
    }
});

module.exports = {
    getPlatformAccounts,
    getPlatformAccountById,
    createPlatformAccount,
    updatePlatformAccount,
    deletePlatformAccount,
};

