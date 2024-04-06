const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
const { deletefiles } = require("../../utils/filesystem");
const product = require("../../model/product");
const subcategory = require("../../model/subcategory");
const category = require("../../model/category");
const image = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");
const uploadimage = require("../../model/image");

async function deleteCategory(request, response) {
  const { id } = request.params;

  // Check if the category has associated products
  const associatedProducts = await product.findMany({
    where: {
      category_id: parseInt(id),
    },
    
  });

  //check if the category has associated sub category
  const associatedSubCategory = await subcategory.findMany({
    where: {
      category_id: parseInt(id),
    },
  });

  if (associatedProducts.length > 0) {
    return response.status(400).json({
      message: "Cannot delete category. It has associated products",
      category: null,
    });
  }

  if (associatedSubCategory.length > 0) {
    return response.status(400).json({
      message: "Cannot delete category. It has associated sub categories",
      category: null,
    });
  }

  // If no associated products, proceed with deletion
  const delcategory = await  category.delete({
    where: { id: parseInt(id) },
  });

  //delete old product images in the database/storage  using prisma
  const oldImages = await uploadimage.findMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.category,
    },
  });
  //delete old product images in the database
  await uploadimage.deleteMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.category,
    },
  });
  
  await deletefiles(oldImages)

  response.json(apiresponse(200, "category deleted successfully", delcategory , "category"));
}

module.exports = deleteCategory;
