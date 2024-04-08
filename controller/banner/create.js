const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const banner = require("../../model/banner");
const uploadimage = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

const createbanner = async (request, response) => {
  try {
    console.log('request', request);
    let { title, subtitle, url } = request.body;
    const image = request.file;
    console.log(image);
    console.log(request.body);
    const imagePath = saveimagePath(image);
    console.log({ title, subtitle, url, imagePath });
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
    response.json(apiresponse(500, "Banner created successfully"))
  }
};

module.exports = createbanner;
