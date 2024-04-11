//popular product fetch from product database based on order count

const orderItem = require("../../model/orderitem");
const product = require("../../model/product");
const { apiresponse } = require("../../utils/apiresponse");
const getproductimages = require("../../utils/dbimage");

const popularProduct = async (request, response) => {
  try {
    const popularProducts = await orderItem.groupBy({
      by: ["product_id"],
      _count: {
        product_id: true,
      },
      orderBy: {
        _count: {
          product_id: "desc",
        },
      },
      take: 10,
    });

    const productIds = popularProducts.map((item) => item.product_id);

    const products = await product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
        subcategory: true,
        ProductTag: {
          include: {
            tags: true,
          },
        },
      },
    });

    if (!products) {
      return response.status(404).json({ error: "No products found" });
    }
    const productsWithImagesInfo = await getproductimages(products);

    return response.json(
      apiresponse(200, "Product Success", productsWithImagesInfo, "products")
    );
  } catch (error) {
    console.error("Error fetching popular products:", error);
    throw error;
  }
};

module.exports = popularProduct;
