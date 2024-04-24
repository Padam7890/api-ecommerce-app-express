const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
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
          ProductTag:{
            include: {
              tags: true
            }
          },
          images:true
        },
      });
  
      if (!product) {
        return response.status(404).json({ error: 'Product not found' });
      }
     
      response.json({ product: product });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  module.exports = getProductByID;


