const express = require("express");
const router = express.Router();

const deleteimage = require("../controller/Images/delete");


router.delete("/:id", deleteimage);


module.exports = router;


