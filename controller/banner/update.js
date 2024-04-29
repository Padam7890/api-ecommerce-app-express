const saveImagePath = require("../../config/imagepath");
const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");

const updateBanner = async (request, response) => {
  try {
    const { title, subtitle, imageUrl, url } = request.body;
    const { id } = request.params;

    let imagePath = imageUrl;
    const image = request.cloudinaryUrl;

    if (image) {
      imagePath = image;
      console.log("Saved Image Path:", imagePath);
    }

    const updatedBanner = await banner.update({
      where: { id: parseInt(id) },
      data: {
        title,
        subtitle,
        url,
        imageUrl: imagePath,
      },
    });

    response.json(
      apiresponse(200, "updatedBanner", updatedBanner, "updatedBanner")
    );
  } catch (error) {
    response.status(505).json(
      apiresponse(505, "Update banner error", error, "banner error")
    );
  }
};

module.exports = updateBanner;
