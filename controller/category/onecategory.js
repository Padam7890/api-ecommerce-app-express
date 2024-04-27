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

    if (!category) {
      return response.json(apiresponse(404, "Not Found",));
    }

    response.json(apiresponse(200, "OK", categories, "category"))

  } catch (error) {
    console.error("Error fetching category and image:", error);
    response.status(500).json(apiresponse(500, "Internal Server Error", error));
  }
}

module.exports = getCategoryByID;
