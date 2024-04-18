const express = require("express");
const mailsubscribe = require("../controller/mailSubscribe");
const unsubscribe = require("../controller/mailSubscribe/unsubscribe");
const router = express.Router();




router.post('/subscribe-mail', mailsubscribe);
router.delete('/unsubscribe/:id', unsubscribe)

module.exports = router;