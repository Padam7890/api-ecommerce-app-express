const saveimagePath = require("../../config/imagepath");
const imagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const category = require("../../model/category");
const uploadimage = require("../../model/image");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

const createCategory = async (request, response) => {
  try {
    const { category_name } = request.body;
    // const image = request.file;

    const image = request.cloudinaryUrl;
    console.log(image)

    const createcategories = await category.create({
      data: {
        category_name: category_name,
        imageUrl: image,
      },
    });

    response.status(201).json(
      apiresponse(
        201,
        "Category added successfully",
        createcategories,
        "category"
      )
    );
  } catch (error) {
    console.error("Error creating category:", error);
    response.status(500).json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = createCategory;
