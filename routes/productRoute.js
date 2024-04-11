const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const createProduct = require("../controller/product/create");
const getAllProducts = require("../controller/product/index");
const getProductByID = require("../controller/product/oneproduct");
const updateProduct = require("../controller/product/update");
const deleteProduct = require("../controller/product/delete");
const featuredproduct = require("../controller/product/featuredproduct");
const searchproduct = require("../controller/product/searchproduct");
const priceFilter = require("../controller/product/priceFilter");
const popularProduct = require("../controller/product/popularproduct");

router.get('/featured_products' , featuredproduct);
router.get('/popular_products' , popularProduct)
router.get('/search', searchproduct );
router.get('/filterbyprice', priceFilter)
router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post("/", upload.array("product_image", 10), createProduct);
router.put("/:id", upload.array("product_image", 10), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
