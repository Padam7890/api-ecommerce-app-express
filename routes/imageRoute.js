const express = require("express");
const router = express.Router();

const deleteimage = require("../controller/Images/delete");
const checkAuth = require("../middleware/auth");


router.delete("/:id", checkAuth, deleteimage);


module.exports = router;


