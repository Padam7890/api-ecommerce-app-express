const getAllProducts = require("../product/index");
const product = require("../../model/product");
const { apiresponse } = require("../../utils/apiresponse");
const getproductimages = require("../../utils/dbimage.js");

const featuredproduct = async (request, response) => {
  try {
    let featuredProducts = await product.findMany({
      where: {
        is_featured: true,
      },
      take:5,
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
     
    //product images

    //default if product is not avilable 
    if (!featuredProducts.length) {
      featuredProducts = await getAllProducts(request, response);
    }
   
    //check already send or not 
    if (!response.headersSent) {
      response.json(
        apiresponse(200, "product", featuredProducts, "products")
      );
    }
  } catch (error) {
    console.error("Error fetching or processing products:", error);
    if (!response.headersSent) {
      response.json(apiresponse(500, "product error", error, "product error"));
    }
  }
};

module.exports = featuredproduct;
