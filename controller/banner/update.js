const saveImagePath = require("../../config/imagepath");
const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");

const updateBanner = async (request, response) => {
  try {
    const { title, subtitle, imageUrl, url } = request.body;
    const { id } = request.params;

    console.log("Request Body:", request.body);
     console.log(imageUrl);
    let imagePath = imageUrl;
    const image = request.file;

    if (image) {
      imagePath = saveImagePath(image);
      console.log("Saved Image Path:", imagePath);
    } else {
      console.log("No new image uploaded.");
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

    console.log("Updated Banner:", updatedBanner);

    response.json(
      apiresponse(200, "updatedBanner", updatedBanner, "updatedBanner")
    );
  } catch (error) {
    console.error("Error:", error);
    response.json(
      apiresponse(505, "Update banner error", error, "banner error")
    );
  }
};

module.exports = updateBanner;
