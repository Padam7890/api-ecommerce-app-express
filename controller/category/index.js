const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const category = require("../../model/category");
const uploadimage = require("../../model/image");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

async function getAllCategory(request, response) {
  try {
    const categories = await category.findMany({
    });
    
    const categoriesWithImages = await Promise.all(categories.map(async category => {
      const images = await uploadimage.findMany({
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
     response.json(apiresponse(200, "OK", categoriesWithImages, "categories"))
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    response.json(apiresponse(500,"Internal server error",  error,  "error"))
  }
}

module.exports = getAllCategory;