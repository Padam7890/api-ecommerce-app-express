const express = require("express");
const router = express.Router();
const banner  = require("../controller/banner/create")
const upload = require("../middleware/upload");
const bannerIndex = require("../controller/banner/index");
const updatebanner = require("../controller/banner/update");
const getonebanner = require("../controller/banner/onebanner");
const deletebanner = require("../controller/banner/delete");

router.post("/", upload.single('image'), banner);
router.get("/", bannerIndex);
router.put("/:id", upload.single("image"), updatebanner);
router.get("/:id",getonebanner)
router.delete("/:id", deletebanner);


module.exports = router;