const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const category = require("../../model/category");
const uploadimage = require("../../model/image");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

async function getCategoryByID(request, response) {
  const { id } = request.params;
  try {
    const categories = await category.findUnique({
      where: { id: parseInt(id) },
    });

    const images = await uploadimage.findFirst({
      where: {
        type_id: category.id,
        type: IMAGE_TYPE.category,
      },
    });

    if (!category) {
      return response.json(apiresponse(404, "Not Found",));
    }
    const catwithimage = {
      ...categories,
      image: images,
    };

    response.json(apiresponse(200, "OK", catwithimage, "category"))

  } catch (error) {
    console.error("Error fetching category and image:", error);
    response.json(apiresponse(500, "Internal Server Error", error));
  }
}

module.exports = getCategoryByID;
