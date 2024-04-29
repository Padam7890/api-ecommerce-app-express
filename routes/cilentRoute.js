const express = require("express");
const cilentcreate = require("../controller/cilent/create");
const upload = require("../middleware/upload");
const gettestimonial = require("../controller/cilent");
const onecilent = require("../controller/cilent/onecilent");
const uploadToCloudinary = require("../middleware/cloudsave");
const router = express.Router();

router.post('/', upload.single("clientImage"), uploadToCloudinary, cilentcreate)
router.get('/', gettestimonial);
router.get('/:id', onecilent);
module.exports = router;