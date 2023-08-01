const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  login,
  getMe,
  updateDetails,
  logout,
  refreshTokens,
  register,
} = require("../controllers/auth.controller");

router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/update-details").put(protect, updateDetails);
router.route("/logout").get(protect, logout);
router.route("/refresh-token").get(refreshTokens);
router.route("/register").post(register); // Temporary route for testing

module.exports = router;
