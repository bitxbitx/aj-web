const asyncHandler = require('express-async-handler');
const Result = require('../models/resultModel');
const Account = require('../models/accountModel');

// @desc    Get all results
// @route   GET /api/results
// @access  Private/Admin
const getResults = asyncHandler(async (req, res) => {
    const results = await Result.find({});
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
    const result = await Result.findById(req.params.id);

    if (result) {
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

    const platformAffected = accountFound[0].platforms.filter(x=>x.platform == req.body.platform)[0];
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

    req.body.results.forEach(async (result) => {
        const AccountFound = await Account.find({ username: result.account });

        if (AccountFound.length === 0) {
            failedResults.push(result);
        } else {
            const newResult = new Result({
                amount: result.amount,
                account: AccountFound,
                platform: result.platform,
            });

            const createdResult = await newResult.save();
            successResults.push(createdResult);

            const platformAffected = AccountFound[0].platforms.filter(x=>x.platform == result.platform)[0];
            platformAffected.amount += result.amount;
            await AccountFound[0].save();
        }

        if (failedResults.length === req.body.results.length) {
            res.status(404);
            throw new Error('All results failed');
        }

        if (failedResults.length > 0) {
            res.status(201).json({
                successResults,
                failedResults,
            });
        } else {
            res.status(201).json(successResults);
        }
    });
});

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private/Admin
const updateResult = asyncHandler(async (req, res) => {
    const result = await Result.findById(req.params.id);

    if (result) {
        result.amount = req.body.amount || result.amount;
        result.account = req.body.account || result.account;
        result.platform = req.body.platform || result.platform;

        const updatedResult = await result.save();
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
