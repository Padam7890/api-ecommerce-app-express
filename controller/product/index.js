const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const getproductimages = require("../../utils/dbimage,js");

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

    const productsWithImagesInfo = await getproductimages(productsWithImages);

    response.json({ products: productsWithImagesInfo });
  } catch (error) {
    console.error("Error fetching products with images:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllProducts;
