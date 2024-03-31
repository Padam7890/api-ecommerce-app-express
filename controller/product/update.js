const { prisma } = require("../../config/prisma");
const upload = require("../../middleware/upload");
const fs = require('fs/promises'); 

async function updateProduct(request, response) {
  try {
    const { id } = request.params;

    // Fetch the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return response.status(404).json({ error: 'Product not found' });
    }

    let {
      product_title,
      product_description,
      regular_price,
      sale_price,
      category_id,
      subcategory_id
    } = request.body;

    // Convert category_id and subcategory_id to integers
    const categoryIdAsInt = parseInt(category_id, 10);
    const subcategoryIdAsInt = subcategory_id ? parseInt(subcategory_id, 10) : null;

    // Look up the category by id
    const category = await prisma.category.findUnique({
      where: { id: categoryIdAsInt },
    });

    if (!category) {
      return response.status(400).json({ error: "Category not found" });
    }

    // Define the updated product data
    const updatedProductData = {
      product_title,
      product_description,
      regular_price,
      sale_price,
      category: {
        connect: { id: category.id }, // Connect the product to the found category
      },
      subcategory: subcategoryIdAsInt ? {
        connect: { id: subcategoryIdAsInt }, // Connect the product to the found subcategory if subcategory_id is provided
      } : null, // Set subcategory to null if subcategory_id is not provided
    };

    // Update the product in the database using Prisma
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updatedProductData,
    });

    const productImages = request.files;

    if (productImages && productImages.length > 0) {
      for (const image of productImages) {
        const imagePath = "/storage/" + image.filename;

        await prisma.image.create({
          data: {
            type_id: updatedProduct.id, // Use the updated product id
            url: imagePath,
            type: "Product",
          },
        });
      }
    }


    response.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = updateProduct;
