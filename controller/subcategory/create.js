const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");
const { apiresponse } = require("../../utils/apiresponse");

async function storesubcategory(request, response) {
  const getalls = request.body;
  console.log(getalls);
  const { subcategory_name } = request.body;
  const { category_id } = request.body;

  const categoryId = parseInt(category_id, 10);
  const image = request.cloudinaryUrl;

  const subcat = await subcategory.create({
    data: {
      subcategory_name: subcategory_name,
      category_id: categoryId,
      imageUrl: image,
    },
  });
  return response
    .status(201)
    .json(
      apiresponse(
        201,
        "Subcategory created successfully",
        subcat,
        "Subcategory"
      )
    );
}

module.exports = storesubcategory;
