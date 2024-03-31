const { prisma } = require("../../config/prisma");
const upload = require("../../middleware/upload");
const createProduct = async (request, response) => {
  try {
    let {
      product_title,
      product_description,
      regular_price,
      sale_price,
      category_id,
      subcategory_id,
    } = request.body;

    // Convert category_id to an integer
    const categoryIdAsInt = parseInt(category_id, 10);
    const subcategoryIdAsInt = subcategory_id
      ? parseInt(subcategory_id, 10)
      : null; // Convert subcategory_id to an integer if provided

    if (!sale_price) {
      sale_price = 0;
    }

    // Look up the category by id
    const category = await prisma.category.findUnique({
      where: { id: categoryIdAsInt },
    });

    if (!category) {
      return response.status(400).json({ error: "Category not found" });
    }

    // Define the product data
    const productData = {
      product_title: product_title,
      product_description: product_description,
      regular_price: regular_price,
      sale_price: sale_price,
      category: {
        connect: { id: category.id }, // Connect the product to the found category
      },
      subcategory: subcategoryIdAsInt
        ? {
            connect: { id: subcategoryIdAsInt }, // Connect the product to the found subcategory if subcategory_id is provided
          }
        : null, // Set subcategory to null if subcategory_id is not provided
    };

    // Save the product information in the database using Prisma
    const product = await prisma.product.create({
      data: productData,
    });

    // Retrieve product images
    const productImages = request.files;

    console.log(productImages.length);

    if (productImages && productImages.length > 0) {
      for (const image of productImages) {
        const imagePath = "/storage/" + image.filename;
        await prisma.image.create({
          data: {
            type_id: product.id, // Use the updated product id
            url: imagePath,
            type: "Product",
          },
        });
      }
    }
    response.json({
      message: "Product added successfully",
      product: product,
      images: productImages,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

module.exports = createProduct;
