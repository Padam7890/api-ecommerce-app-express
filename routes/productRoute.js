const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/products");

router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post("/", upload.single("product_image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

