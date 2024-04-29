const saveimagePath = require("../../config/imagepath");
const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");

const updatelogo = async (request, response) => {
  try {
    const { name, imageUrl, url } = request.body;
    const { id } = request.params;

    let imagePath = imageUrl;
    const image = request.cloudinaryUrl;

    if (image) {
      imagePath = image;
    } 

    const logoUpdate = await logo.update({
      where: { id: parseInt(id) },
      data: {
        name,
        imageUrl: imagePath,
        url,
      },
    });
    response.json(
      apiresponse(200, "logo updated successfully", logoUpdate, "Logo")
    );
  } catch (error) {
    console.error("Error updating logo:", error);
    response.json(apiresponse(500, "Internal Server Error" , error));
  }
};

module.exports = updatelogo;
