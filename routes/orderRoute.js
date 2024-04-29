const express = require("express");
const getorders = require("../controller/order/create");
const getOrderfromdb = require("../controller/order");
const deleteorder = require("../controller/order/delete");
const checkAuth = require("../middleware/auth");
const checkPermission = require("../middleware/restrict");
const router = express.Router();



router.post('/', checkAuth, checkPermission(["delete"]),  getorders);
router.get('/', checkAuth, checkPermission(["delete"]), getOrderfromdb),
router.delete('/:id', checkAuth, checkPermission(["delete"]), deleteorder) 

module.exports = router;