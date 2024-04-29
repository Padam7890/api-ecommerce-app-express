const express = require("express");
const router = express.Router();
const banner  = require("../controller/banner/create")
const upload = require("../middleware/upload");
const bannerIndex = require("../controller/banner/index");
const updatebanner = require("../controller/banner/update");
const getonebanner = require("../controller/banner/onebanner");
const deletebanner = require("../controller/banner/delete");
const uploadToCloudinary = require("../middleware/cloudsave");

router.post("/", upload.single('image'), uploadToCloudinary, banner);
router.get("/", bannerIndex);
router.put("/:id", upload.single("image"),uploadToCloudinary, updatebanner);
router.get("/:id",getonebanner)
router.delete("/:id", deletebanner);


module.exports = router;