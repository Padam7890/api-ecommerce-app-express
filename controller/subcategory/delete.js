const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");
const product = require("../../model/product");
const { deletefile } = require("../../utils/filesystem");
const category = require("../../model/category");
const { apiresponse } = require("../../utils/apiresponse");

async function deletesubcategory(request, response) {
  const { id } = request.params;

  // Check if the category has associated products
  const associatedProducts = await product.findMany({
    where: {
      subcategory_id: parseInt(id),
    },
  });

  if (associatedProducts.length > 0) {
    return response.status(400).json(apiresponse(400,"Unable to delete it has associated products"));
  }
  const subcategoryToDelete = await subcategory.findUnique({
    where: { id: parseInt(id) },
  });

  if (!subcategoryToDelete) {
    return response
      .status(404)
      .json(apiresponse(404, "Subcategory not found", null));
  }

  const subcat = await subcategory.delete({
    where: { id: parseInt(id) },
  });

  return response
    .status(200)
    .json(apiresponse(200, "Subcategory Deleted Sucessfully"));
}

module.exports = deletesubcategory;
