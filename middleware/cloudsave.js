const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

async function uploadToCloudinary(req, res, next) {
  try {
    // // Check if there is no file to upload
    // if (!req.file && !req.files) {
    //   req.cloudinaryUrl = ""; // Set an empty string for single file upload
    //   console.log("No file to upload");
    //   return next();
    // }

    // Handle single file upload
    if (req.file) {
      await cloudinary.uploader.upload(req.file.path, function (error, result) {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error uploading file to Cloudinary" });
        }
        req.cloudinaryUrl = result.secure_url;
        next();
      });
    }

    // Handle multiple file uploads
    else if (req.files) {
      const cloudinaryUrls = [];
      for (const file of req.files) {
        await cloudinary.uploader.upload(file.path, function (error, result) {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ error: "Error uploading file to Cloudinary" });
          }
          cloudinaryUrls.push(result.secure_url);
        });
      }
      req.cloudinaryUrls = cloudinaryUrls;
      next();
    } else {
      req.cloudinaryUrl = ""; // Set an empty string for single file upload
      console.log("No file to upload");
      return next();
    }
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    // Ensure to call next() in case of error to proceed to the next middleware
    next(error);
  }
}

module.exports = uploadToCloudinary;
