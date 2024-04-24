const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");


async function storesubcategory(request, response) {
    const getalls = request.body;
    console.log(getalls);
    const { subcategory_name } = request.body;
    const { category_id } = request.body;

    const categoryId = parseInt(category_id, 10);
    const image = request.file;
    const imagePath = saveimagePath(image);
    const subcat = await subcategory.create({
      data: {
        subcategory_name: subcategory_name,
        category_id: categoryId,
        imageUrl: imagePath
      },
    });

      response.json({
      subcategory: subcat,
      message: "Subcategory added successfully",
      image: imagePath,
    });
  }

  module.exports = storesubcategory;