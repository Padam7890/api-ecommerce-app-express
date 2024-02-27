const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");

const { register, login, balance } = require("../controller/user");

router.post("/register", register);
router.post("/login", login);

module.exports = router;


