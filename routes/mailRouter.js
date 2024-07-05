const express = require("express");
const mailsubscribe = require("../controller/mailSubscribe");
const unsubscribe = require("../controller/mailSubscribe/unsubscribe");
const getdashboarddetails = require("../controller/dashboards");
const router = express.Router();




router.post('/subscribe-mail', mailsubscribe);
router.delete('/unsubscribe/:id', unsubscribe);
router.get('/dashboard', getdashboarddetails)
router.get('/cookie', function (req, res) {
     res.cookie('cookie', "cookies")
    res.send(req.cookies)
    console.log(req.cookies)
})

module.exports = router;