const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const getallSubcategory = require("../controller/subcategory/index")
const storesubcategory = require("../controller/subcategory/create")
const updatesubcategory = require("../controller/subcategory/update")
const getsubcaregoryById = require("../controller/subcategory/onesubcat")
const deletesubcategory = require("../controller/subcategory/delete")


router.get("/", getallSubcategory);
router.post("/", upload.single('image'),storesubcategory);
router.put("/:id",upload.single('image'), updatesubcategory);
router.get("/:id", getsubcaregoryById);
router.delete("/:id", deletesubcategory);




module.exports = router;