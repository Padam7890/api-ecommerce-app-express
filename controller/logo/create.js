const saveimagePath = require("../../config/imagepath");
const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");

const logocreate = async (request, response) => {
  try {
    const { name, url } = request.body;
    const image = request.file;
    const imagePath = saveimagePath(image);

    const logoadd = await logo.create({
      data: {
        name,
        url,
        imageUrl: imagePath,
      },
    });
    response.json(apiresponse(200, "Logo created successfully", logoadd));
  } catch (error) {
    console.log(error);
    response.json(apiresponse(500, "Logo not created", error));
  }
};

module.exports = logocreate;
