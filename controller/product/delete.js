const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
const productsImages = require("../../model/image");
const orderItem = require("../../model/orderitem");
async function deleteProduct(request, response) {
  const { id } = request.params;

  // Find the product to be deleted
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }

  try {
    await prisma.$transaction([
      // Delete product images
      productsImages.deleteMany({
        where: {
          product_id: parseInt(id),
        },
      }),

      // Delete product tags (if applicable)
      prisma.productTag.deleteMany({
        where: {
          product_id: parseInt(id),
        },
      }),
      orderItem.deleteMany({
        where: {
          product_id: parseInt(id),
        },
      }),

      // Now, delete the product itself
      prisma.product.delete({ where: { id: parseInt(id) } }),
    ]);
    response.json({
      message: "Product Deleted successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = deleteProduct;
