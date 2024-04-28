// const { randomUUID } = require("crypto");
// const multer = require("multer");

// const { v2: cloudinary } = require('cloudinary');
          
// cloudinary.config({ 
//   cloud_name: 'djsdxexto', 
//   api_key: '498133595171588', 
//   api_secret: 'qcWMIx583KHPg1tbiGKAH5KA3ck' 
// });

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./storage/"); // Adjust the path based on your project structure
//   },
//   filename: function (req, file, cb) {
//     cb(null, randomUUID() +  file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;


const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

module.exports = upload;

