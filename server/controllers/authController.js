const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Account = require('../models/accountModel');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../config/jwtHelper');
const jwt = require('jsonwebtoken');

// @desc    Auth user & get token
// @route   POST /api/auth
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide an email and password');
    }

    const account = await Account.findOne({ email }).select('+password').populate('platformAccounts');

    if (account && (await account.matchPassword(password))) {
        const accessToken = await signAccessToken(account._id);
        const refreshToken = await signRefreshToken(account._id);

        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                path: '/',
                maxAge: 15 * 60 * 1000 // 15 minutes
            })
            .json({
                _id: account._id,
                username: account.username,
                email: account.email,
                role: account.role,
                birthdate: account.birthdate,
                platformAccounts: account.platformAccounts,
            });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.account._id).populate('platformAccounts');

    if (account) {
        res.json({
            _id: account._id,
            username: account.username,
            email: account.email,
            role: account.role,
            birthdate: account.birthdate,
            platformAccounts: account.platformAccounts,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.account._id);

    if (account) {
        account.username = req.body.username || account.username;
        account.email = req.body.email || account.email;
        if (req.body.password) {
            account.password = req.body.password;
        }

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
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE /api/auth
// @access  Private
const deleteAccount = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.account._id);

    if (account) {
        await account.remove();
        res.json({ message: 'Account removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get new access token
// @route   GET /api/auth/token
// @access  Private
const getNewAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(403);
        throw new Error('Refresh token is missing');
    }

    const decoded = await verifyRefreshToken(refreshToken);

    if (!decoded) {
        res.status(403);
        throw new Error('Refresh token is invalid');
    }

    const account = await Account.findById(decoded._id).populate('platformAccounts');

    if (!account) {
        res.status(403);
        throw new Error('Account not found');
    }

    const accessToken = await signAccessToken(account._id);

    res
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            path: '/',
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        .json({
            _id: account._id,
            username: account.username,
            email: account.email,
            role: account.role,
            birthdate: account.birthdate,
            platformAccounts: account.platformAccounts,
        });
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
    res
        .clearCookie('refreshToken', {
            httpOnly: true,
            path: '/',
        })
        .clearCookie('accessToken', {
            httpOnly: true,
            path: '/',
        })
        .json({ message: 'Logged out' });
});

module.exports = {
    login,
    getProfile,
    updateProfile,
    deleteAccount,
    getNewAccessToken,
    logout
};
