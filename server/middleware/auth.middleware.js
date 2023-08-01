const createError = require('http-errors');
const Account = require('../models/account.model');
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../config/jwtHelper');

const protect = async (req, res, next) => {
    // Extract the token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check if token is valid 
    if (!token) return res.status(401).json({ message: 'Access token not found' });
    try {
        const decoded = await verifyAccessToken(token);
        req.account = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = { protect };