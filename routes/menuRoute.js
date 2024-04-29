const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const getmenu = require("../controller/menu/create");
const getallmenu = require("../controller/menu");
const oneMenu = require("../controller/menu/onemenu");
const updatemenu = require("../controller/menu/update");
const deletemenu = require("../controller/menu/delete");
const checkAuth = require("../middleware/auth");
const checkPermission = require("../middleware/restrict");


router.post('/', checkAuth, getmenu);
router.get('/', checkAuth, getallmenu);
router.get('/:id',checkAuth, oneMenu)
router.put('/:id',checkAuth, updatemenu)
router.delete('/:id', checkAuth, checkPermission(["delete"]), deletemenu)

module.exports = router;