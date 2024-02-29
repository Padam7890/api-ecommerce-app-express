const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
    getAllCategory,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,

} = require("../controller/category");

router.get("/", getAllCategory);
router.get("/:id", getCategoryByID);
router.post("/",  createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;



