const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management APIs
 */

/**
 * @swagger
 * paths:
 *   /accounts/{id}:
 *     get:
 *       summary: Get an account by ID
 *       tags: [Accounts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Account ID
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   account:
 *                     $ref: '#/components/schemas/Account'
 *         '404':
 *           description: Account not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (account) {
    res.json({ account });
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

/**
 * @swagger
 * paths:
 *   /accounts/{id}:
 *     put:
 *       summary: Update an account by ID
 *       tags: [Accounts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Account ID
 *         - in: formData
 *           name: image
 *           type: file
 *           description: Account profile image
 *         - in: formData
 *           name: password
 *           type: string
 *           description: Account password (plain text)
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   account:
 *                     $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request - validation error or duplicate key error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '404':
 *           description: Account not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const updateAccount = asyncHandler(async (req, res) => {
  try {
    const account = await Account.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json({ account });
  } catch (error) {
    // Check if the error is a validation error
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors });
    }

    // If duplicate key error return a simple message
    if (error.code === 11000) {
      return res.status(400).json({ error: "Account already exists" });
    }

    // If any other error return the full error
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * paths:
 *   /accounts/{id}:
 *     delete:
 *       summary: Delete an account by ID
 *       tags: [Accounts]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Account ID
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Account not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Account removed" });
});

/**
 * @swagger
 * paths:
 *   /accounts:
 *     get:
 *       summary: Get all accounts
 *       tags: [Accounts]
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accounts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Account'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({});
  res.json({ accounts });
});

/**
 * @swagger
 * paths:
 *   /accounts:
 *     post:
 *       summary: Create a new account
 *       tags: [Accounts]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   account:
 *                     $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request - validation error or duplicate key error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const createAccount = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const account = new Account(req.body);
    await account.save();
    res.json({ account });
  } catch (error) {
    // Check if the error is a validation error
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors });
    }

    // If duplicate key error return a simple message
    if (error.code === 11000) {
      return res.status(400).json({ error: "Account already exists" });
    }

    // If any other error return the full error
    res.status(500).json({ error: error.message });
  }
});

module.exports = { getAccount, updateAccount, deleteAccount, getAccounts, createAccount };
