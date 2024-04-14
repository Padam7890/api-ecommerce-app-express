const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const getmenu = require("../controller/menu/create");
const getallmenu = require("../controller/menu");


router.post('/', getmenu);
router.get('/', getallmenu);


module.exports = router;