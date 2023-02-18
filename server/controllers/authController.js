const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Account = require('../models/accountModel');
const Platform = require('../models/platformModel');
const { signAccessToken, signRefreshToken } = require('../config/jwtHelper');

// @desc    Auth user & get token
// @route   POST /api/auth
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error('Please provide an username and password');
    }

    const account = await Account.findOne({ username }).select('+password').populate('platformAccounts');

    if (account && (await account.matchPassword(password))) {
        const accessToken = await signAccessToken(account._id.toString());
        const refreshToken = await signRefreshToken(account._id.toString());

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

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { username, email, password, birthdate, role } = req.body;

    if (!username || !email || !password || !birthdate || !role) {
        res.status(400);
        throw new Error('Please provide a username, email, password, and birthdate');
    }

    const accountExists = await Account.findOne({ email });

    if (accountExists) {
        res.status(400);
        throw new Error('Account already exists');
    }

    const account = await Account.create({
        username,
        email,
        password,
        birthdate,
        role
    });

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
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.userId).populate('platformAccounts');

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
    const account = await Account.findById(req.userId);

    if (account) {


        account.username = req.body.username || account.username;
        account.email = req.body.email || account.email;
        account.birthdate = req.body.birthdate || account.birthdate;
        account.role = req.body.role || account.role;

        if ( req.body.platformAccounts) {
            req.body.platformAccounts.forEach(async (platformAccount) => {
                const platformFound = await Platform.findOne({ name: platformAccount.platform });

                if (platformFound) {
                    const tempPlatformAccount = account.platformAccounts.find((accountPlatformAccount) => { 
                        return accountPlatformAccount.platform.toString() === platformFound._id.toString() });

                    if (tempPlatformAccount) {
                        tempPlatformAccount.balance = platformAccount.balance;
                    } else {
                        account.platformAccounts.push({
                            platform: platformFound._id,
                            balance: platformAccount.balance
                        });
                    }
                }
            });
        }                

        if (req.body.password) {
            account.password = req.body.password;
        }

        console.log("account22", account)
        const updatedAccount = await account.save();
        console.log("updatedAccount", updatedAccount)
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
// @route   DELETE /api/auth/:id
// @access  Private
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

// @desc    Get new access token
// @route   GET /api/auth/token
// @access  Private
const getNewAccessToken = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.userId).populate('platformAccounts');

    if (!account) {
        res.status(403);
        throw new Error('Account not found');
    }

    const accessToken = await signAccessToken(account._id.toString());

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
    register,
    getProfile,
    updateProfile,
    deleteAccount,
    getNewAccessToken,
    logout
};
