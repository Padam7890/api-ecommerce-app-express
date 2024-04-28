const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

// Middleware function to upload a file to Cloudinary
function uploadToCloudinary(req, res, next) {
  if (!req.file) {
    req.cloudinaryUrl = '';
    console.log("no file to upload");
    return next();
  }

  cloudinary.uploader.upload(req.file.path, function (error, result) {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error uploading file to Cloudinary" });
    }

    // Attach the Cloudinary URL of the uploaded image to the request object
    req.cloudinaryUrl = result.secure_url;
    next();
  });
}

module.exports = uploadToCloudinary;
