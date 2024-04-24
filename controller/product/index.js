const product = require("../../model/product");
const { apiresponse } = require("../../utils/apiresponse");
const getproductimages = require("../../utils/dbimage.js");

const getAllProducts = async (request, response) => {
  try {
    const productsWithImages = await product.findMany({
      include: {
        category: true,
        subcategory: true,
        ProductTag: {
          include: {
            tags: true,
          },
        },
        images:true,

      },
    });
    if (!productsWithImages) {
      return response.status(404).json({ error: "No products found" });
    }
    return response.json(
      apiresponse(200, "Product List", productsWithImages, "products")
    );
  } catch (error) {
    console.error("Error fetching products with images:", error);
    return response.json(apiresponse(500, "Product List error",error,"Error"))
  }
};

module.exports = getAllProducts;
