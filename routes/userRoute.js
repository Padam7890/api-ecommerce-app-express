const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");

const login = require("../controller/user/userlogin");
const forgetPass = require("../controller/user/forgetpass");
const resetPassword = require("../controller/user/resetPassword");
const register = require("../controller/user/register");
const createRateLimiter= require("../middleware/ratelimit");
const { usertoAdmin } = require("../prisma/seed");
const getAlluser = require("../controller/user/getalluser");
const getuserdetails = require("../controller/user/getuser");
const changepassword = require("../controller/user/changepass");

const windowMs = 1 * 60 * 1000; 
const message = `Too many login attempts. Please try again in 1 Minute`;

router.get('/users', getAlluser )
router.post("/register", register);
router.post("/login", createRateLimiter(windowMs, 5, message), login);
router.post("/forgetPassword", forgetPass);
router.patch("/resetpassword/:token", resetPassword);
router.patch("/updateadmin/:id", usertoAdmin )
router.get('/profile',checkAuth, getuserdetails);
router.post('/passwordChanged', checkAuth, changepassword)
module.exports = router;
