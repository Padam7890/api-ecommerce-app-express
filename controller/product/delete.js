const { prisma } = require("../../config/prisma");
const upload = require("../../middleware/upload");
const fs = require("fs/promises");

async function deleteProduct(request, response) {
  const { id } = request.params;

  const product = await prisma.product.delete({ where: { id: parseInt(id) } });

  //delete old product images in the database/storage  using prisma
  const oldImages = await prisma.image.findMany({
    where: {
      type_id: parseInt(id),
      type: "Product",
    },
  });
  //delete old product images in the database
  await prisma.image.deleteMany({
    where: {
      type_id: parseInt(id),
      type: "Product",
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
  
  response.json({
    message: "Product Deleted successfully",
    product: product,
  });
}

module.exports = deleteProduct;
