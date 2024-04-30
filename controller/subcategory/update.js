const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { apiresponse } = require("../../utils/apiresponse");

async function updatesubcategory(request, response) {
  const { id } = request.params;
  const { subcategory_name, category_id, imageUrl } = request.body;

  const image = request.cloudinaryUrl;
  let imagePath = imageUrl;

  if (image) {
    imagePath = image;
  }

  const categoryId = parseInt(category_id, 10);

  const subcat = await prisma.subcategory.update({
    where: { id: parseInt(id) },
    data: {
      subcategory_name: subcategory_name,
      category_id: categoryId,
      imageUrl: imagePath,
    },
  });

  response.status(200).json(apiresponse(200, "Subcategory updated successfully", subcat, "Subcategory"));
}

module.exports = updatesubcategory;
