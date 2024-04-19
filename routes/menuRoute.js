const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const getmenu = require("../controller/menu/create");
const getallmenu = require("../controller/menu");
const oneMenu = require("../controller/menu/onemenu");
const updatemenu = require("../controller/menu/update");
const deletemenu = require("../controller/menu/delete");


router.post('/', getmenu);
router.get('/', getallmenu);
router.get('/:id', oneMenu)
router.put('/:id', updatemenu)
router.delete('/:id', deletemenu)


module.exports = router;