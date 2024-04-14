const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");

const { register, login, balance, resetpasswordtoken } = require("../controller/user");
const {forgetPass, resetPassword} = require("../controller/user/forgetpass");

router.post("/register", register);
router.post("/login", login);
router.post("/forgetPassword", forgetPass);
router.patch("/resetpassword/:token", resetPassword);


module.exports = router;



