const product = require("../../model/product");
const { apiresponse } = require("../../utils/apiresponse");

const searchproduct = async (request, response) => {
  try {
    const { search } = request.query;
    console.log(search);
    const products = await product.findMany({
      where: {
        product_title: {
          contains: search,
        },
      },
    });

    if (products.length === 0 ) {
      return response.json(apiresponse(400, "No products found"));
    }

    return response.json(
      apiresponse(200, "Search results", products, "products")
    );
  } catch (error) {
    console.error(error);
    response.json(
      apiresponse(500, "Error searching for products", error, "Search Error")
    );
  }
};

module.exports = searchproduct;
