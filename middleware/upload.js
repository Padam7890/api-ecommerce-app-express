const { randomUUID } = require("crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/"); // Adjust the path based on your project structure
  },
  filename: function (req, file, cb) {
    cb(null, randomUUID() +  file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
