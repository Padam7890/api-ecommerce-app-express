const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const category = require("../../model/category");
const uploadimage = require("../../model/image");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

async function getAllCategory(request, response) {
  try {
    const categories = await category.findMany({
      include: {
        products:{
          include:{
            images:true,
          }
        },
      }

    });
     response.json(apiresponse(200, "OK", categories, "categories"))
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    response.status(500).json(apiresponse(500,"Internal server error",  error,  "error"))
  }
}

module.exports = getAllCategory;