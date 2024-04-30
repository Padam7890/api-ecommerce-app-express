const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const { apiresponse } = require("../../utils/apiresponse");

async function getsubcaregoryById(request, response) {
  const { id } = request.params;
  try {
    const subcat = await prisma.subcategory.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subcat) {
      return response.status(404).json(apiresponse(404, "Subcategory not found"));
    }

    response.json({ subcat: subcat });
  } catch (error) {
    console.error("Error fetching Subcategory and image:", error);
    response.status(500).json(apiresponse(500, "Error fetching Subcategory", error, "Error"));
  }
}

module.exports = getsubcaregoryById;
