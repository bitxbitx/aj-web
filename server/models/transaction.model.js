const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Transaction ID
 *           example: "611fda05f2d63e001bbcc7a1"
 *         account:
 *           type: string
 *           description: Account ID associated with the transaction
 *           example: "611fda05f2d63e001bbcc7a1"
 *         platform:
 *           type: string
 *           enum:
 *             - "Profit"
 *             - "Vboss"
 *             - "Game"
 *           description: Platform name (Profit, Vboss, Game)
 *           example: "Profit"
 *         amount:
 *           type: number
 *           description: Amount for the transaction
 *           example: 1000.50
 *         type:
 *           type: string
 *           enum:
 *             - "deposit"
 *             - "withdraw"
 *             - "transfer"
 *             - "bonus"
 *             - "result"
 *             - "adjustment"
 *             - "others"
 *           description: Type of transaction (deposit, withdraw, transfer, bonus, etc.)
 *           example: "deposit"
 *         status:
 *           type: string
 *           enum:
 *             - "pending"
 *             - "completed"
 *             - "cancelled"
 *           description: Status of the transaction (pending, completed, cancelled)
 *           example: "completed"
 *         remark:
 *           type: string
 *           description: Remark or additional notes for the transaction
 *           example: "Deposit from PayPal"
 *       example:
 *         _id: "611fda05f2d63e001bbcc7a1"
 *         account: "611fda05f2d63e001bbcc7a1"
 *         platform: "Profit"
 *         amount: 1000.50
 *         type: "deposit"
 *         status: "completed"
 *         remark: "Deposit from PayPal"
 */
const transactionSchema = new Schema (
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },
    platform: {
      type: String,
      required: true,
      trim: true,
      enums: ["Profit", "Vboss", "Game"],
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enums: ["deposit", "withdraw", "transfer", "bonus", "result", "adjustment", "others"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

transactionSchema.methods.toJSON = function () {
  const transaction = this;
  const transactionObject = transaction.toObject();

  delete transactionObject.__v;

  return transactionObject;
}

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;