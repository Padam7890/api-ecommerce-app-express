const { prisma } = require("../../config/prisma");
const upload = require("../../middleware/upload");

const getAllProducts = async (request, response) => {
    try {
      const productsWithImages = await prisma.product.findMany({
        include: {
            category: true,
            subcategory: true,
          },
      });
      
      // Fetch all images where type is 'Product'
      const productImages = await prisma.image.findMany({
        where: {
          type: 'Product'
        }
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
      const productsWithImagesInfo = productsWithImages.map(product => ({
        ...product,
        images: productImagesMap[product.id] || [] // Assign associated images or an empty array if none found
      }));
  
      response.json({ products: productsWithImagesInfo });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = getAllProducts;
  