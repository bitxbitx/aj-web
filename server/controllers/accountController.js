const asyncHandler = require('express-async-handler');
const Account = require('../models/accountModel');

// @desc    Get all accounts
// @route   GET /api/accounts
// @access  Private/Admin
const getAccounts = asyncHandler(async (req, res) => {
    const accounts = await Account.find({});
    res.json(accounts);
});

// @desc    Get account by ID
// @route   GET /api/accounts/:id
// @access  Private/Admin
const getAccountById = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);

    if (account) {
        res.json(account);
    } else {
        res.status(404);
        throw new Error('Account not found');
    }
});

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Private/Admin
const deleteAccount = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);

    if (account) {
        await account.remove();
        res.json({ message: 'Account removed' });
    } else {
        res.status(404);
        throw new Error('Account not found');
    }
});

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Private/Admin
const updateAccount = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);

    if (account) {
        account.username = req.body.username || account.username;
        account.email = req.body.email || account.email;
        account.role = req.body.role || account.role;
        account.birthdate = req.body.birthdate || account.birthdate;
        account.platformAccounts = req.body.platformAccounts || account.platformAccounts;

        const updatedAccount = await account.save();
        res.json({
            _id: updatedAccount._id,
            username: updatedAccount.username,
            email: updatedAccount.email,
            role: updatedAccount.role,
            birthdate: updatedAccount.birthdate,
            platformAccounts: updatedAccount.platformAccounts,
        });
    } else {
        res.status(404);
        throw new Error('Account not found');
    }
});

// @desc    Create new account
// @route   POST /api/accounts
// @access  Private/Admin
const createAccount = asyncHandler(async (req, res) => {
    const { username, email, password, role, birthdate, platformAccounts } = req.body;

    if ( !username || !email || !password || !role || !birthdate || !platformAccounts ) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const accountExists = await Accounts.findOne({ email });

    if (accountExists) {
        res.status(400);
        throw new Error('Account already exists');
    }

    const account = await Account.create({
        username,
        email,
        password,
        role,
        birthdate,
        platformAccounts,
    });

    if (account) {
        res.status(201).json({
            _id: account._id,
            username: account.username,
            email: account.email,
            role: account.role,
            birthdate: account.birthdate,
            platformAccounts: account.platformAccounts,
        });
    } else {
        res.status(400);
        throw new Error('Invalid account data');
    }
});

module.exports = {
    getAccounts,
    getAccountById,
    deleteAccount,
    updateAccount,
    createAccount,
};
