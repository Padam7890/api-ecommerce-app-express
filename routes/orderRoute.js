const express = require("express");
const getorders = require("../controller/order/create");
const getOrderfromdb = require("../controller/order");
const deleteorder = require("../controller/order/delete");
const router = express.Router();



router.post('/',  getorders);
router.get('/', getOrderfromdb),
router.delete('/:id', deleteorder) 

module.exports = router;