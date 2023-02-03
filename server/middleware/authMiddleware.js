const createError = require('http-errors');
const Account = require('../models/accountModel');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../config/jwtHelper');

const protect = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        res.status(401);
        next(createError.Unauthorized('Not authorized, no token'));
    }

    await verifyAccessToken(accessToken).then( userId => {
        req.userId = userId;
        next();
    }).catch( async error => {
        await verifyRefreshToken(refreshToken).then( async userId => {
            if (!userId) {
                res.status(401);
                next(createError.Unauthorized('Not authorized, no token'));
            }

            const accessToken = await signAccessToken(userId);
            const refreshToken = await signRefreshToken(userId);

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
            req.userId = userId;
            next();
        }).catch( error => {
            res.status(401);
            next(createError.Unauthorized('Not authorized, token failed'));
        })
    })
}

const admin = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        res.status(401);
        next(createError.Unauthorized('Not authorized, no token'));
    }

    await verifyAccessToken(accessToken).then( userId => {
        Account.findById(userId).then( user => {
            if (user.role === 'admin') {
                req.userId = userId;
                next();
            } else {
                res.status(401);
                next(createError.Unauthorized('Not authorized, no token'));
            }
        })
    }).catch( async error => {
        await verifyRefreshToken(refreshToken).then( async userId => {
            if (!userId) {
                res.status(401);
                next(createError.Unauthorized('Not authorized, no token'));
            }

            const accessToken = await signAccessToken(userId);
            const refreshToken = await signRefreshToken(userId);

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
            Account.findById(userId).then( user => {
                if (user.role === 'admin') {
                    req.userId = userId;
                    next();
                } else {
                    res.status(401);
                    next(createError.Unauthorized('Not authorized, no token'));
                }
            })
        }).catch( error => {
            res.status(401);
            next(createError.Unauthorized('Not authorized, token failed'));
        })
    })
};

module.exports = { protect, admin };