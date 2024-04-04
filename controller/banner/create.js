const { prisma } = require("../../config/prisma");
const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");

const createbanner = async (request, response) => {
  try {
    let { title, subtitle, url } = request.body;

    const imageUrl = request.file;
    const imagePath = "/storage/" + imageUrl.filename;
    console.log({ title, subtitle, url, imagePath });
    const banners = await banner.create({
      data: {
        title,
        subtitle,
        url,
        imageUrl: imagePath,
      },
    });

    apiresponse(201, "Banner created successfully", banners);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = createbanner;
