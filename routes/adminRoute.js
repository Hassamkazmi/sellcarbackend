const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logout,
  forgotPassword,
  resetPassword,
  getAdminDetails,
  updatePassword,
  updateProfile,
  getAllAdmin,
  getSingleAdmin,
  updateAdminRole,
  deleteAdmin
} = require("../controllers/AdminController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.route("/adminregister").post(
  registerAdmin
);

router.route("/adminlogin").post(loginAdmin);


module.exports = router;
