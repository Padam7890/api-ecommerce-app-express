const express = require("express");
const getorders = require("../controller/order/create");
const getOrderfromdb = require("../controller/order");
const router = express.Router();



router.post('/',  getorders);
router.get('/', getOrderfromdb), 

module.exports = router;