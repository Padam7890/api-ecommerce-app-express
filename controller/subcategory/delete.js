const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");
const product = require("../../model/product");
const { deletefile } = require("../../utils/filesystem");
const category = require("../../model/category");

async function deletesubcategory(request, response) {
  const { id } = request.params;

  // Check if the category has associated products
  const associatedProducts = await product.findMany({
    where: {
      subcategory_id: parseInt(id),
    },
  });

  if (associatedProducts.length > 0) {
    return response.status(400).json({
      message: "Cannot delete subcategory. It has associated products",
      subcategory: null,
    });
  }
  const subcategoryToDelete = await subcategory.findUnique({
    where: { id: parseInt(id) },
  });

  if (!subcategoryToDelete) {
    return response.status(404).json({
      message: "SubCategory not found",
      category: null,
    });
  }

  if (subcategoryToDelete.imageUrl) {
    await deletefile(subcategoryToDelete.imageUrl);
    console.log("subcategory image delted", subcategoryToDelete.imageUrl);
  }
  const subcat = await subcategory.delete({
    where: { id: parseInt(id) },
  });

  response.json({
    subcat: subcat,
    message: "Subcategory deleted successfully",
  });
}

module.exports = deletesubcategory;
