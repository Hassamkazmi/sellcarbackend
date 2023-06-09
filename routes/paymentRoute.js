const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser);

router.route("/stripeapikey").get(isAuthenticatedUser);

module.exports = router;
