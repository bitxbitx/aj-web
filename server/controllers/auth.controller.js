const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");
const asyncHandler = require("express-async-handler");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../config/jwtHelper");
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account management
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *   LoginRequest:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         example: "johndoe"
 *       password:
 *         type: string
 *         example: "password123"
 *   RefreshTokenRequest:
 *     type: object
 *     properties:
 *       refreshToken:
 *         type: string
 *         example: "refresh_token_here"
 *   UpdateDetailsRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: "John Doe"
 *       email:
 *         type: string
 *         example: "john_doe@example.com"
 *       role:
 *         type: string
 *         example: "User"
 *       username:
 *         type: string
 *         example: "johndoe123"
 *       phoneNumber:
 *         type: string
 *         example: "1234567890"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return access and refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   $ref: '#/components/schemas/Account'
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: JWT refresh token
 *       '400':
 *         description: Invalid username or password
 *       '404':
 *         description: Account not found
 *       '500':
 *         description: Internal server error
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const account = await Account.findOne({ username });

  if (!account) {
    res.status(400).json({ error: "Account not found" });
  } else {
    const passwordMatches = await bcrypt.compare(password, account.password);
    if (!passwordMatches) {
      res.status(400).json({ error: "Wrong password" });
    } else {
      const accessToken = await signAccessToken(account._id.toString());
      const refreshToken = await signRefreshToken(account._id.toString());

      res.json({ account, accessToken, refreshToken });
      return;
    }
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear access and refresh tokens
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Logged out successfully
 *       '500':
 *         description: Internal server error
 */
const logout = asyncHandler(async (req, res) => {
  // remove all cookie
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.json({ message: "Logged out successfully" });
});

/**
 * @swagger
 * /api/auth/refresh-tokens:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       '200':
 *         description: Access token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: JWT refresh token
 *       '401':
 *         description: Refresh token missing or invalid
 *       '500':
 *         description: Internal server error
 */
const refreshTokens = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const refreshToken = authHeader && authHeader.split(" ")[1];
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    console.log("refresh token")
    console.log(refreshToken)
    // console.log("process.env.REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET)
    // const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const decoded = verifyRefreshToken(refreshToken);
    const account = await Account.findById(decoded.userId);
    if (!account) {
      throw new Error("Account not found");
    }
    const savedRefreshToken = account.refreshToken;
    if (savedRefreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = signAccessToken(account._id);
    const newRefreshToken = signRefreshToken(account._id);
    account.refreshToken = newRefreshToken;
    await account.save();

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   $ref: '#/components/schemas/Account'
 *       '401':
 *         description: Unauthorized, access token missing or invalid
 *       '404':
 *         description: Account not found
 *       '500':
 *         description: Internal server error
 */
const getMe = asyncHandler(async (req, res) => {
  const accountId = req.account;

  const account = await Account.findById(accountId);
  if (!account) {
    res.status(404).json({ error: "Account not found" });
  } else {
    res.json({ account });
  }
});

/**
 * @swagger
 * /api/auth/update-details:
 *   put:
 *     summary: Update authenticated user's profile details
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDetailsRequest'
 *     responses:
 *       '200':
 *         description: Updated user profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   $ref: '#/components/schemas/Account'
 *       '401':
 *         description: Unauthorized, access token missing or invalid
 *       '404':
 *         description: Account not found
 *       '500':
 *         description: Internal server error
 */
const updateDetails = asyncHandler(async (req, res) => {
  const account = await Account.findOneAndUpdate(
    { _id: req.accountId },
    req.body,
    { new: true }
  );
  if (!account) {
    res.status(404).json({ error: "Account not found" });
  } else {
    res.json({ account });
  }
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new account (DON'T USE IN PRODUCTION)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username for the new account
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Password for the new account
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Account registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   $ref: '#/components/schemas/Account'
 *       '400':
 *         description: Bad request - account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const account = await Account.create({
    username,
    password,
  });

  if (!account) {
    res.status(400).json({ error: "Account not found" });
  } else {
    res.json({ account });
  }
});

module.exports = {
  login,
  logout,
  refreshTokens,
  getMe,
  updateDetails,
  register,
};
