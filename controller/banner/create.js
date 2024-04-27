const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const banner = require("../../model/banner");
const uploadimage = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

const createbanner = async (request, response) => {
  try {
    
    let { title, subtitle, url } = request.body;
    const image = request.file;
    const imagePath = saveimagePath(image);
    const banners = await banner.create({
      data: {
        title,
        subtitle,
        url,
        imageUrl: imagePath,
      },
    });
    response.json(apiresponse(201, "Banner created successfully",banners))
  } catch (error) {
    console.log(error);
    response.status(500).json(apiresponse(500, "Banner Error",error))
  }
};

module.exports = createbanner;
