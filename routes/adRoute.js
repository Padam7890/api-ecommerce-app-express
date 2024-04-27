const express = require("express");
const createad = require("../controller/advertisment/createad");
const router = express.Router();

const upload = require("../middleware/upload");
const getadvertisment = require("../controller/advertisment/indexad");
const editad = require("../controller/advertisment/onead");
const deletead = require("../controller/advertisment/deletad");
const updatead = require("../controller/advertisment/updatead");

router.get('/',   getadvertisment);
router.post('/',  upload.single('url'),  createad);
router.put('/:id',  upload.single('image'),  updatead);
router.get('/:id',  editad );
router.delete('/:id',  deletead )


module.exports = router;