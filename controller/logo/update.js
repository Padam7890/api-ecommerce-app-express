const saveimagePath = require("../../config/imagepath");
const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");

const updatelogo = async (request, response) => {
  try {
    const { name, imageUrl, url } = request.body;
    const { id } = request.params;

    console.log("Request Body:", request.body);

    let imagePath = imageUrl;
    const image = request.file;

    if (image) {
      imagePath = saveimagePath(image);
      console.log("Saved Image Path:", imagePath);
    } else {
      console.log("No new image uploaded.");
    }
    console.log(imagePath);
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
