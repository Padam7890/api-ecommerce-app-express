const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const getAllCategory = require("../controller/category/index")
const updateCategory = require("../controller/category/update")
const createCategory = require("../controller/category/create")
const getCategoryByID = require("../controller/category/onecategory")
const deleteCategory = require("../controller/category/delete");
const checkAuth = require("../middleware/auth");
const restrict = require("../middleware/restrict");
const uploadToCloudinary = require("../middleware/cloudsave");
const checkPermission = require("../middleware/restrict");

router.get("/", getAllCategory);
router.get("/:id", getCategoryByID);
router.post("/", upload.single("image") , uploadToCloudinary, createCategory);
router.put("/:id", upload.single("image"),uploadToCloudinary, updateCategory);
router.delete("/:id", checkAuth, checkPermission(["delete"]) , deleteCategory);

module.exports = router;




