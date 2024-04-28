const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djsdxexto",
  api_key: "498133595171588",
  api_secret: "qcWMIx583KHPg1tbiGKAH5KA3ck",
});

module.exports = cloudinary;
