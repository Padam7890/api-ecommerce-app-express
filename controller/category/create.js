const saveimagePath = require("../../config/imagepath");
const imagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const category = require("../../model/category");
const uploadimage = require("../../model/image");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

const createCategory = async (request, response) => {
  const { category_name } = request.body;
  const image = request.file;

  const imagePath = saveimagePath(image);

  const createcategories = await category.create({
    data: {
      category_name: category_name,
      imageUrl: imagePath,

    },
  });

  response.json(apiresponse(200,"Category added successfully", createcategories,"category" ))
};

module.exports = createCategory;
