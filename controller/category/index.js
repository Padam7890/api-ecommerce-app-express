const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

async function getAllCategory(request, response) {
  try {
    const categories = await prisma.category.findMany({

    });
    
    const categoriesWithImages = await Promise.all(categories.map(async category => {
      const images = await prisma.image.findMany({
        where: {
          type_id: category.id,
          type:IMAGE_TYPE.category
        },
      });
      
      
      return {
        ...category,
        image: images
      };
    }));

    response.json({ categories: categoriesWithImages });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAllCategory;