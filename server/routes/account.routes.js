const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller");

router.route("/").get(protect, getAccounts).post(protect, createAccount);

router
  .route("/:id")
  .get(protect, getAccount)
  .put(protect, updateAccount)
  .delete(protect, deleteAccount);

module.exports = router;
