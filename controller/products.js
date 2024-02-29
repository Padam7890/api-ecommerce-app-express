const { prisma } = require("../config/prisma");
const upload = require("../middleware/upload");

async function getAllProducts(request, response) {
  try {
    const productsWithCategories = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    response.json({ products: productsWithCategories });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getProductByID(request, response) {
  const { id } = request.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
    },
  });

  response.json({ product: product });
}


const createProduct = async (request, response) => {
  let {
    product_title,
    product_description,
    regular_price,
    sale_price,
    category_id,
  } = request.body;


  // Convert category_id to an integer
  const categoryIdAsInt = parseInt(category_id, 10);

  const product_image = request.file;

  if (!product_image) {
    return response.status(400).json({ error: "Product image is required" });
  }
  if (!sale_price) {
     sale_price = 0;
  }


  const imagePath = "./storage/" + product_image.filename;

  // Look up the category by id
  const category = await prisma.category.findUnique({
    where: { id: categoryIdAsInt },
  });

  if (!category) {
    return response.status(400).json({ error: "Category not found" });
  }

  // Save the product information in the database using Prisma
  const product = await prisma.product.create({
    data: {
      product_title: product_title,
      product_description: product_description,
      regular_price: regular_price,
      sale_price: sale_price,
      product_image: imagePath,
      category: {
        connect: { id: category.id }, // Connect the product to the found category
      },
    },
  });

  response.json({ message: "Product added successfully", product: product });
};

async function updateProduct(request, response) {
  const { id } = request.params;

  const {
    product_title,
    product_description,
    regular_price,
    sale_price,
    category_id,
  } = request.body;

  // Convert category_id to an integer
  const categoryIdAsInt = parseInt(category_id, 10);

  const product_image = request.file;

  if (!product_image) {
    return response.status(400).json({ error: "Product image is required" });
  }

  const imagePath = "./storage/" + product_image.filename;

  // Look up the category by id
  const category = await prisma.category.findUnique({
    where: { id: categoryIdAsInt },
  });

  if (!category) {
    return response.status(400).json({ error: "Category not found" });
  }
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      product_title: product_title,
      product_description: product_description,
      regular_price: regular_price,
      sale_price: sale_price,
      product_image: imagePath,
      category: {
        connect: { id: category.id }, // Connect the updated product to the found category
      },
    },
  });

  response.json({
    message: "Product updated successfully",
    product: product,
  });
}

async function deleteProduct(request, response) {
  const { id } = request.params;

 const product = await prisma.product.delete({ where: { id: parseInt(id) } });

  response.json({
    message: "Product Deleted successfully",
    product: product,
  });}

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};




