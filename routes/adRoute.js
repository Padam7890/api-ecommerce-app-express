const express = require("express");
const createad = require("../controller/advertisment/createad");
const router = express.Router();

const upload = require("../middleware/upload");
const getadvertisment = require("../controller/advertisment/indexad");
const editad = require("../controller/advertisment/onead");
const deletead = require("../controller/advertisment/deletad");

router.get('/',getadvertisment);
router.post('/', upload.single('url'),  createad);
router.get('/:id', editad );
router.delete('/:id', deletead )


module.exports = router;