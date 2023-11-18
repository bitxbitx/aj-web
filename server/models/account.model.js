const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Account ID
 *           example: "611fda05f2d63e001bbcc7a1"
 *         username:
 *           type: string
 *           description: The username of the account
 *           example: john_doe
 *         name:
 *           type: string
 *           description: The name of the account holder
 *           example: John Doe
 *         password:
 *           type: string
 *           description: The account password (minimum 6 characters)
 *           example: password123
 *         birthday:
 *           type: string
 *           format: date
 *           description: The birthday of the account holder
 *           example: "1990-01-01"
 *         role:
 *           type: string
 *           enum:
 *             - "admin"
 *             - "user"
 *             - "staff"
 *           description: The role of the account (admin, user, staff)
 *           example: "user"
 *         baki:
 *           type: number
 *           description: The account balance
 *           example: 1000.50
 *         platformAccounts:
 *           type: array
 *           description: Array of platform accounts associated with the account
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 enum:
 *                   - "Profit"
 *                   - "Vboss"
 *                   - "Game"
 *                 description: The platform name
 *                 example: "Profit"
 *               balance:
 *                 type: number
 *                 description: The balance of the platform account
 *                 example: 500.25
 *       required:
 *         - username
 *         - name
 *         - password
 *         - birthday
 *         - role
 */
const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    birthday: {
      type: Date,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enums: ["admin", "user", "staff"],
      default: "user",
    },
    profit: {
      balance: {
        type: Number,
        default: 0,
      },
      baki: {
        type: Number,
        default: 0,
      },
    },
    vboss: {
      balance: {
        type: Number,
        default: 0,
      },
      baki: {
        type: Number,
        default: 0,
      },
    },
    game: {
      balance: {
        type: Number,
        default: 0,
      },
      baki: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

accountSchema.methods.toJSON = function () {
  const account = this;
  const accountObject = account.toObject();

  delete accountObject.password;
  delete accountObject.__v;

  return accountObject;
};

accountSchema.methods.matchPassword = async function (password) {
  const account = this;
  return await bcrypt.compare(password, account.password);
};

accountSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "account",
});

module.exports = mongoose.model("Account", accountSchema);
