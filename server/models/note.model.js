const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Note ID
 *           example: "611fda05f2d63e001bbcc7a1"
 *         amount:
 *           type: number
 *           description: Amount for the note
 *           example: 1000.50
 *         method:
 *           type: string
 *           enum:
 *             - "cash"
 *             - "card"
 *             - "transfer"
 *             - "cheque"
 *           description: Payment method (cash, card, transfer, cheque)
 *           example: "card"
 *         image:
 *           type: string
 *           description: URL to the image for the note
 *           example: "https://example.com/images/note.jpg"
 *         status:
 *           type: string
 *           enum:
 *             - "pending"
 *             - "approved"
 *             - "rejected"
 *           description: Status of the note (pending, approved, rejected)
 *           example: "pending"
 *         platform:
 *           type: string
 *           enum:
 *             - "Profit"
 *             - "Vboss"
 *             - "Game"
 *           description: Platform for the note (Profit, Vboss, Game)
 *           example: "Profit"
 *         account:
 *           type: string
 *           description: Account ID associated with the note
 *           example: "611fda05f2d63e001bbcc7a1"
 *         remark:
 *           type: string
 *           description: Remark or additional notes for the payment
 *           example: "Payment for order #12345"
 *         noteNo:
 *           type: integer
 *           description: Auto-incremented note number
 *           example: 1
 *       example:
 *         _id: "611fda05f2d63e001bbcc7a1"
 *         amount: 1000.50
 *         method: "card"
 *         image: "https://example.com/images/note.jpg"
 *         status: "pending"
 *         platform: "Profit"
 *         account: "611fda05f2d63e001bbcc7a1"
 *         remark: "Payment for order #12345"
 *         noteNo: 1
 */

const noteSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
      enums: ["cash", "card", "transfer", "cheque"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enums: ["pending", "approved", "rejected"],
    },
    platform: {
      type: String,
      required: true,
      trim: true,
      enums: ["Profit", "Vboss", "Game"],
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    remark: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
noteSchema.plugin(AutoIncrement, { inc_field: "noteNo" });

noteSchema.methods.toJSON = function () {
  const note = this;
  const noteObject = note.toObject();

  delete noteObject.__v;

  return noteObject;
};

module.exports = mongoose.model("Note", noteSchema);
