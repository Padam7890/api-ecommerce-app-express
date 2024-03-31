const { prisma } = require("../../config/prisma");

async function getCategoryByID(request, response) {
  const { id } = request.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    const image = await prisma.image.findFirst({
      where: {
        type_id: category.id,
        type: "Category",
      },
    });

    if (!category) {
      return response.status(404).json({ error: "Category not found" });
    }
    const catwithimage = {
      ...category,
      image: image,
    };

    response.json({ category: catwithimage });
  } catch (error) {
    console.error("Error fetching category and image:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getCategoryByID;
