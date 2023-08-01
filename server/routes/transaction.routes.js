const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller"); // Update the import to the transaction controller

router.route("/").get(protect, getTransactions).post(protect, createTransaction); // Update route functions

router
  .route("/:id")
  .get(protect, getTransaction)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
