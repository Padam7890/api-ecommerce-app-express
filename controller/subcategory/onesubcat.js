const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

async function getsubcaregoryById(request, response) {
  const { id } = request.params;
  try {
    const subcat = await prisma.subcategory.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subcat) {
      return response.status(404).json({ error: "subcat not found" });
    }

    response.json({ subcat: subcat });
  } catch (error) {
    console.error("Error fetching Subcategory and image:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getsubcaregoryById;
