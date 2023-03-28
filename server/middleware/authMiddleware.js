const createError = require('http-errors');
const Account = require('../models/accountModel');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../config/jwtHelper');

const protect = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        console.log('no token')
        res.status(401);
        next(createError.Unauthorized('Not authorized, no token'));
    }

    await verifyAccessToken(accessToken).then( userId => {
        req.userId = userId;
        next();
    }).catch( async error => {
        await verifyRefreshToken(refreshToken).then( async vrtUserID => {
            if (!vrtUserID) {
                console.log('vrt user id failed')
                res.status(401);
                next(createError.Unauthorized('Not authorized, no token'));
            }

            const accessToken = await signAccessToken(vrtUserID);
            const refreshToken = await signRefreshToken(vrtUserID);

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
            req.userId = vrtUserID;
            next();

        }).catch( error => {
            console.log('vrt failed')
            res.status(401);
            next(createError.Unauthorized('Not authorized, token failed'));
        })
    })
}


// todo: there is an issue with the admin middleware, it is not working as intended
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
        await verifyRefreshToken(refreshToken).then( async vrtUserID => {
            if (!vrtUserID) {
                res.status(401);
                next(createError.Unauthorized('Not authorized, no token'));
            }

            const accessToken = await signAccessToken(vrtUserID);
            const refreshToken = await signRefreshToken(vrtUserID);

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

            Account.findById(vrtUserID).then( user => {
                if (user.role === 'admin') {
                    req.userId = user._id;
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