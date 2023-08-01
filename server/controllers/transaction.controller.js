const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model"); // Assuming you have a Transaction model
const mongoose = require("mongoose");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management APIs
 */

/**
 * @swagger
 * paths:
 *   /transactions/{id}:
 *     get:
 *       summary: Get a transaction by ID
 *       tags: [Transactions]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Transaction ID
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   transaction:
 *                     $ref: '#/components/schemas/Transaction'
 *         '404':
 *           description: Transaction not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction) {
    res.json({ transaction });
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

/**
 * @swagger
 * paths:
 *   /transactions/{id}:
 *     put:
 *       summary: Update a transaction by ID
 *       tags: [Transactions]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Transaction ID
 *         - in: formData
 *           name: amount
 *           type: number
 *           description: Transaction amount
 *         - in: formData
 *           name: category
 *           type: string
 *           description: Transaction category
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   transaction:
 *                     $ref: '#/components/schemas/Transaction'
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
 *           description: Transaction not found
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

const updateTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ transaction });
  } catch (error) {
    // Handle error as before
  }
});

/**
 * @swagger
 * paths:
 *   /transactions/{id}:
 *     delete:
 *       summary: Delete a transaction by ID
 *       tags: [Transactions]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: Transaction ID
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
 *           description: Transaction not found
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

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Transaction removed" });
});

/**
 * @swagger
 * paths:
 *   /transactions:
 *     get:
 *       summary: Get all transactions
 *       tags: [Transactions]
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   transactions:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Transaction'
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

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({});
  res.json({ transactions });
});

/**
 * @swagger
 * paths:
 *   /transactions:
 *     post:
 *       summary: Create a new transaction
 *       tags: [Transactions]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   transaction:
 *                     $ref: '#/components/schemas/Transaction'
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

const createTransaction = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json({ transaction });
  } catch (error) {
    // Handle error as before
  }
});

const createTransactions = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    // Look for account with the same username for each transaction
    const transactions = await Promise.all(
      req.body.map(async (transaction) => {
        const account = await Account.findOne({
          username: transaction.username,
        });
        if (account) {
          transaction.account = account._id;

          // Update the account balance
          if ( transaction.platform.toLowerCase() === 'profit' ) {
            account.profit.balance += transaction.amount;
          } else if ( transaction.platform.toLowerCase() === 'vboss' ) {
            account.vboss.balance += transaction.amount;
          } else if ( transaction.platform.toLowerCase() === 'game' ) {
            account.game.balance += transaction.amount;
          }

          await account.save();

          const newTransaction = new Transaction(transaction);
          await newTransaction.save();
          return newTransaction;
        }
      })
    );

    


    res.json({ transactions });
  } catch (error) {
    // Handle error as before
  }
});

module.exports = {
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  createTransaction,
};
