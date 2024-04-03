const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

const getAllProducts = async (request, response) => {
  try {
    const productsWithImages = await prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        ProductTag:{
          include: {
            tags: true
          }
        }
      },
    });


    if (!productsWithImages) {
      return response.status(404).json({ error: "No products found" });
    }

    // Fetch all images where type is 'Product'
    const productImages = await prisma.image.findMany({
      where: {
        type: IMAGE_TYPE.product,
      },
    });

    // Create a map to associate product ids with their respective images
    const productImagesMap = productImages.reduce((acc, image) => {
      if (!acc[image.type_id]) {
        acc[image.type_id] = [];
      }
      acc[image.type_id].push(image);
      return acc;
    }, {});

    // Merge product information with their associated images
    const productsWithImagesInfo = productsWithImages.map((product) => ({
      ...product,
      images: productImagesMap[product.id] || [], // Assign associated images or an empty array if none found
    }));

    response.json({ products: productsWithImagesInfo });
  } catch (error) {
    console.error("Error fetching products with images:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllProducts;
