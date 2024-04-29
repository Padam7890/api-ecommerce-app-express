const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const logostore = require("../controller/logo/create");
const logoList = require("../controller/logo/index");
const logoone = require("../controller/logo/logoone");
const updatelogo = require("../controller/logo/update");
const deletelogo = require("../controller/logo/delete");
const uploadToCloudinary = require("../middleware/cloudsave");

router.post("/", upload.single('image'), uploadToCloudinary, logostore);
router.get('/', logoList);
router.get('/:id', logoone)
router.put('/:id', upload.single('image'), uploadToCloudinary, updatelogo)
router.delete('/:id', deletelogo)

module.exports = router;