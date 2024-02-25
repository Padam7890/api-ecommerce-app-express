const { prisma } = require("../config/prisma");
const upload = require("../middleware/upload"); 

async function getAllProducts(request, response) {
  const products = await prisma.product.findMany();

  response.json({ products: products });
}

async function getProductByID(request, response) {
  const { id } = request.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  response.json({ product: product });
}

const createProduct = async (request, response) => {
  const { product_title, product_description, regular_price, sale_price } = request.body;

  // Multer middleware has already processed the file upload
  const product_image = request.file;

  if (!product_image) {
    return response.status(400).json({ error: 'Product image is required' });
  }

  const imagePath = './storage/' + product_image.filename;

  // Save the product information in the database using Prisma
  const product = await prisma.product.create({
    data: {
      product_title: product_title,
      product_description: product_description,
      regular_price: regular_price,
      sale_price: sale_price,
      product_image: imagePath,
    },
  });

  response.json({ message: 'Product added successfully', product: product });
};


async function updateProduct(request, response) {
  const { id } = request.params;
  const { title, description, price, image } = request.body;

  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      title: title,
      description: description,
      price: price,
      image: image,
    },
  });

  response.json({
    message: "Product updated successfully",
    product: product,
  });
}

async function deleteProduct(request, response) {
  const { id } = request.params;

  await prisma.product.delete({ where: { id: parseInt(id) } });

  response.json({ products: products });
}

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};