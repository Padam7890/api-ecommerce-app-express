const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");

const login = require("../controller/user/userlogin");
const forgetPass = require("../controller/user/forgetpass");
const resetPassword = require("../controller/user/resetPassword");
const register = require("../controller/user/register");

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPassword", forgetPass);
router.patch("/resetpassword/:token", resetPassword);

module.exports = router;
