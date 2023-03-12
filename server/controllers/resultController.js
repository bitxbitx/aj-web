const asyncHandler = require('express-async-handler');
const Result = require('../models/resultModel');
const Account = require('../models/accountModel');
const Platform = require('../models/platformModel');

// @desc    Get all results
// @route   GET /api/results
// @access  Private/Admin
const getResults = asyncHandler(async (req, res) => {
    const results = await Result.find({}).populate('account').populate('platform');
    res.json(results);
});

// @desc    Get result by ID
// @route   GET /api/results/:id
// @access  Private/Admin
const getResultById = asyncHandler(async (req, res) => {
    const result = await Result.findById(req.params.id).populate('account').populate('platform');

    if (result) {
        res.json(result);
    } else {
        res.status(404);
        throw new Error('Result not found');
    }
});

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private/Admin
const deleteResult = asyncHandler(async (req, res) => {
    const result = await Result.findById(req.params.id).populate('platform');

    if (result) {
        // Update Platform affected inside account
        const accountFound = await Account.findById(result.account._id).populate('platformAccounts.platform');
        const platformAffected = accountFound.platformAccounts.filter(x => x.platform.name == result.platform.name)[0];
        platformAffected.balance -= result.amount;
        await accountFound.save();
        await result.remove();

        res.json({ message: 'Result removed' });
    } else {
        res.status(404);
        throw new Error('Result not found');
    }
});

// @desc    Create result
// @route   POST /api/results
// @access  Private/Admin
const createResult = asyncHandler(async (req, res) => {
    const accountFound = await Account.find({ username: req.body.account });

    if (accountFound.length === 0) {
        res.status(404);
        throw new Error('Account not found');
    }

    const result = new Result({
        amount: req.body.amount,
        account: accountFound,
        platform: req.body.platform,
    });

    const createdResult = await result.save();

    const platformAffected = accountFound[0].platforms.filter(x => x.platform == req.body.platform)[0];
    platformAffected.amount += req.body.amount;
    await accountFound[0].save();

    res.status(201).json(createdResult);
});

//@desc   Create multiple results
//@route  POST /api/results/multiple
//@access Private/Admin
const createMultipleResults = asyncHandler(async (req, res) => {
    const failedResults = [];
    const successResults = [];

    req.body.forEach(async (result) => {

        /* Finding the account and platform in the database. */
        const accountFound = await Account.find({ username: result.account }).populate('platformAccounts.platform');
        const platformFound = await Platform.find({ name: result.platform });

        if (accountFound) {
            /* Creating a new result and saving it to the database. */
            const newResult = new Result({
                amount: result.amount,
                account: accountFound[0],
                platform: platformFound[0],
            });
            const createdResult = await newResult.save();

            /* Updating the balance of the platformAccounts array in the account model. */
            const platformAffected = accountFound[0].platformAccounts.filter(x => x.platform.name == result.platform)[0];
            platformAffected.balance += result.amount;
            console.log("platformAffected", platformAffected)
            await accountFound[0].save();
            successResults.push(createdResult);
        } else {
            failedResults.push({
                ...result,
                error: 'Account not found',
            });
        }

        res.status(201).json({
            successResults,
            failedResults,
        });
    });
});

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private/Admin
const updateResult = asyncHandler(async (req, res) => {
    const result = await Result.findById(req.params.id).populate('platform');
    const accountFound = await Account.find({ username: req.body.account }).populate('platformAccounts.platform');
    const platformFound = await Platform.find({ name: req.body.platform });

    if (result) {

        // Update platform balance if there is a difference between the old and new platform
        if (result.platform.name !== req.body.platform) {
            const oldPlatform = accountFound[0].platformAccounts.filter(x => x.platform.name == result.platform.name)[0];
            const newPlatform = accountFound[0].platformAccounts.filter(x => x.platform.name == req.body.platform)[0];
            oldPlatform.balance -= result.amount;
            newPlatform.balance += result.amount;
        }

        // Update account balance if there is a difference between the old and new amount
        if (result.amount !== req.body.amount) {
            
            // Check if account totalbalance is negative before updating
            if (accountFound[0].totalBalance - (req.body.amount - result.amount) < 0) {
                const platform = accountFound[0].platformAccounts.filter(x => x.platform.name == result.platform.name)[0];
                platform.balance -= result.amount;
                platform.balance += req.body.amount;
            } else {
                accountFound[0].totalBalance -= (req.body.amount - result.amount);
            }
        }


        /* Updating the result. */
        result.amount = req.body.amount || result.amount;
        result.account = accountFound[0] || result.account;
        result.platform = platformFound[0] || result.platform;
        await accountFound[0].save();
        const updatedResult = await result.save();

        /* Returning the updated result. */
        res.json({
            _id: updatedResult._id,
            amount: updatedResult.amount,
            account: updatedResult.account,
            platform: updatedResult.platform,
        });
    } else {
        res.status(404);
        throw new Error('Result not found');
    }
});

module.exports = {
    getResults,
    getResultById,
    deleteResult,
    createResult,
    createMultipleResults,
    updateResult,
};
