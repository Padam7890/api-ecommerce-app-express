const express = require("express");
const createad = require("../controller/advertisment/createad");
const router = express.Router();

const upload = require("../middleware/upload");
const getadvertisment = require("../controller/advertisment/indexad");
const editad = require("../controller/advertisment/onead");
const deletead = require("../controller/advertisment/deletad");
const updatead = require("../controller/advertisment/updatead");
const uploadToCloudinary = require("../middleware/cloudsave");
const checkAuth = require("../middleware/auth");
const checkPermission = require("../middleware/restrict");

router.get('/',   getadvertisment);
router.post('/',  upload.single('image'), uploadToCloudinary,  createad);
router.put('/:id',  upload.single('image'), uploadToCloudinary,  updatead);
router.get('/:id',  editad );
router.delete('/:id', checkAuth, checkPermission(['delete']) ,  deletead )


module.exports = router;