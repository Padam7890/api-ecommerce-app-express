const { prisma } = require("../../config/prisma");
const { deletefiles } = require("../../utils/filesystem");
const product = require("../../model/product");
const subcategory = require("../../model/subcategory");
const category = require("../../model/category");
const { apiresponse } = require("../../utils/apiresponse");

async function deleteCategory(request, response) {
  const { id } = request.params;

  try {
    await prisma.$transaction(async (prisma) => {
      // Check if the category exists
      const categoryToDelete = await prisma.category.findUnique({
        where: { id: parseInt(id) },
      });

      if (!categoryToDelete) {
        return response.status(404).json({
          message: "Category not found",
          category: null,
        });
      }

      // Check if the category has associated products
      const associatedProducts = await prisma.product.findMany({
        where: {
          category_id: parseInt(id),
        },
      });

      // Check if the category has associated subcategories
      const associatedSubCategories = await prisma.subcategory.findMany({
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

      if (associatedSubCategories.length > 0) {
        return response.status(400).json({
          message: "Cannot delete category. It has associated subcategories",
          category: null,
        });
      }

      // Delete the category from the database
      await prisma.category.delete({ where: { id: parseInt(id) } });

      // If everything is successful, send a success response
      return response.status(200).json({
        message: "Category deleted successfully",
        category: categoryToDelete,
      });
    });
  } catch (error) {
    // Handle any errors that occur during the transaction
    console.error("Error deleting category:", error);
    return response.status(500).json({
      message: "Internal server error",
      category: null,
    });
  }
}
module.exports = deleteCategory;
