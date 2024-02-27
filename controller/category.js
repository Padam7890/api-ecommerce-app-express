const { prisma } = require("../config/prisma");

async function getAllCategory(request, response) {
  const categories = await prisma.category.findMany();

  response.json({ categories: categories });
}

async function getCategoryByID(request, response) {
  const { id } = request.params;

  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });

  response.json({ category: category });
}

const createCategory = async (request, response) => {
  const {category_name } =request.body;

  // Save the product information in the database using Prisma
  const category = await prisma.category.create({
    data: {
        category_name: category_name,
    },
  });

  response.json({ message: "Category added successfully", category: category });
};

async function updateCategory(request, response) {
  const { id } = request.params;
  const {category_name } =request.body;

  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: {
        category_name: category_name,
    },
  });

  response.json({
    message: "Category updated successfully",
    product: category,
  });
}

async function deleteCategory(request, response) {
  const { id } = request.params;

 const category = await prisma.category.delete({ where: { id: parseInt(id) } });

  response.json({ category: category });
}

module.exports = {
  getAllCategory,
  getCategoryByID,
  createCategory,
  updateCategory,
  deleteCategory,
};
