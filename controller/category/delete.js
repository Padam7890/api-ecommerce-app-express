const { prisma } = require("../../config/prisma");
const { deletefiles } = require("../../utils/filesystem");
const product = require("../../model/product");
const subcategory = require("../../model/subcategory");
const category = require("../../model/category");
const { apiresponse } = require("../../utils/apiresponse");


async function deleteCategory(request, response) {
  const { id } = request.params;

  try {
    // Check if the category has associated products
    const associatedProducts = await product.findMany({
      where: {
        category_id: parseInt(id),
      },
    });
  
    console.log("Associated Products:", associatedProducts);
  
    // Check if the category has associated subcategories
    const associatedSubCategories = await subcategory.findMany({
      where: {
        category_id: parseInt(id),
      },
    });
  
    console.log("Associated Subcategories:", associatedSubCategories);
  
    if (associatedProducts.length > 0 || associatedSubCategories.length > 0) {
      return response.status(400).json({
        message: "Cannot delete category. It has associated products or subcategories",
        category: null,
      });
    } else {
      // Delete the category from the database
      await category.delete({ where: { id: parseInt(id) } });
      return response.status(200).json({
        message: "Category deleted successfully",
        category: parseInt(id),
      });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
  
}
module.exports = deleteCategory;
