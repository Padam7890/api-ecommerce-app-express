const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");
async function deleteProduct(request, response) {
  const { id } = request.params;

  // Find the product to be deleted
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }
 //delete old product images in the database/storage  using prisma
 const oldImages = await prisma.image.findMany({
  where: {
    type_id: parseInt(id),
    type: IMAGE_TYPE.product
  },
});
  // Delete related records first (e.g., images, tags, etc.)
  // Delete product images
  await prisma.image.deleteMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.product,
    },
  });
  for (const image of oldImages) {
    try {
      await fs.unlink("." + image.url);
      console.log("Successfully deleted image:", image.url);
    } catch (error) {
      console.error("Unable to unlink/delete image:", image.url, error);
    }
  }

  // Delete product tags (if applicable)
  await prisma.productTag.deleteMany({
    where: {
      product_id: parseInt(id),
    },
  });
  
  await prisma.orderItem.deleteMany({
    where: {
      product_id: parseInt(id),
    },
  })

  // Now, delete the product itself
  await prisma.product.delete({ where: { id: parseInt(id) } });

  response.json({
    message: "Product Deleted successfully",
    product: product,
  });
}

module.exports = deleteProduct;

module.exports = deleteProduct;
