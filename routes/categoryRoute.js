const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const getAllCategory = require("../controller/category/index")
const updateCategory = require("../controller/category/update")
const createCategory = require("../controller/category/create")
const getCategoryByID = require("../controller/category/onecategory")
const deleteCategory = require("../controller/category/delete")

router.get("/", getAllCategory);
router.get("/:id", getCategoryByID);
router.post("/", upload.single("image") , createCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;




