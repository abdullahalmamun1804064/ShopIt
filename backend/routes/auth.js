const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController.js");

const { isAuthenticatedUser } = require("../middlewares/auth");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/me").get( isAuthenticatedUser ,getUserProfile);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);


router.route('/logout').get(logout);
module.exports = router;