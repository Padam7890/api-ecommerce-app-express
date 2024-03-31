const { prisma } = require("../../config/prisma");
const upload = require("../../middleware/upload");

const getProductByID = async (request, response) => {
    try {
      const { id } = request.params;
  
      // Fetch the product along with its category and subcategory
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          category: true,
          subcategory: true,
        },
      });
  
      if (!product) {
        return response.status(404).json({ error: 'Product not found' });
      }
  
      // Fetch associated images for the product where type is 'Product'
      const productImages = await prisma.image.findMany({
        where: {
          type: 'Product',
          type_id: parseInt(id)
        }
      });
  
      // Add the images to the product object
      const productWithImages = {
        ...product,
        images: productImages
      };
  
      response.json({ product: productWithImages });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  module.exports = getProductByID;


