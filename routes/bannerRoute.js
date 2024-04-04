const express = require("express");
const router = express.Router();
const banner  = require("../controller/banner/create")
const upload = require("../middleware/upload");
const bannerIndex = require("../controller/banner/index")

router.post("/", upload.single('imageUrl'), banner);
router.get("/", bannerIndex)


module.exports = router;