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

    // Check if the category has associated subcategories
    const associatedSubCategories = await subcategory.findMany({
      where: {
        category_id: parseInt(id),
      },
    });

    if ( associatedProducts &&  associatedProducts.length > 0) {
      return response.status(400).json({
        message: "Cannot delete category. It has associated products",
        category: null,
      });
    }

    if (associatedSubCategories && associatedSubCategories.length > 0) {
      return response.status(400).json({
        message: "Cannot delete category. It has associated subcategories",
        category: null,
      });
    }

    // Retrieve the category data to get the image path
    const categoryToDelete = await category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!categoryToDelete) {
      return response.status(404).json({
        message: "Category not found",
        category: null,
      });
    }


    // Delete the category from the database
    await category.delete({ where: { id: parseInt(id) } });

    response.json(apiresponse(200, "Category deleted successfully", null, "category"));
  } catch (error) {
    console.error("Error deleting category:", error);
    response.status(500).json(apiresponse(500, "Internal Server Error"));
  }
}
module.exports = deleteCategory;
