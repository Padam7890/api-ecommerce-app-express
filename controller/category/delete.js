const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
const { deletefiles } = require("../../utils/filesystem");

async function deleteCategory(request, response) {
  const { id } = request.params;

  // Check if the category has associated products
  const associatedProducts = await prisma.product.findMany({
    where: {
      category_id: parseInt(id),
    },
    
  });

  //check if the category has associated sub category
  const associatedSubCategory = await prisma.subcategory.findMany({
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
  const category = await prisma.category.delete({
    where: { id: parseInt(id) },
  });

  //delete old product images in the database/storage  using prisma
  const oldImages = await prisma.image.findMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.category,
    },
  });
  //delete old product images in the database
  await prisma.image.deleteMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.category,
    },
  });

  // for (const image of oldImages) {
  //   try {
  //     await fs.unlink("." + image.url);
       
  //     console.log("Successfully deleted image:", image.url);
  //   } catch (error) {
  //     console.error("Unable to unlink/delete image:", image.url, error);
  //   }
  // }
  
  await deletefiles(oldImages)

  response.json({
    message: "Category deleted successfully",
    category: category,
  });
}

module.exports = deleteCategory;
