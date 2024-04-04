const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const { apiresponse } = require("../../utils/apiresponse");

async function updateProduct(request, response) {
  try {
    const { id } = request.params;

    // Fetch the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return response.status(404).json({ error: "Product not found" });
    }

    let {
      product_title,
      product_description,
      regular_price,
      sale_price,
      category_id,
      subcategory_id,
      product_tags,
      is_featured,
      product_sku,
      product_quantity,
      product_weight,
      product_size,
      product_color,
      stock_type,
    } = request.body;
    console.log(request.body);

    // Convert string to boolean value
    is_featured = is_featured === "true" ? true : false;

    // Convert string to int
    product_sku = parseInt(product_sku, 10);
    product_quantity = parseInt(product_quantity, 10);

    // Convert string to decimal value
    product_weight = parseFloat(product_weight);
    product_size = parseFloat(product_size);

    // Convert category_id and subcategory_id to integers
    const categoryIdAsInt = parseInt(category_id, 10);
    const subcategoryIdAsInt = subcategory_id
      ? parseInt(subcategory_id, 10)
      : null;

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
      sale_price: sale_price || 0, // Set default value if sale_price is not provided
      is_featured,
      product_sku,
      product_quantity,
      product_weight,
      product_size,
      product_color,
      stock_type,
      category: {
        connect: { id: categoryIdAsInt },
      },
      subcategory: subcategoryIdAsInt
        ? {
            connect: { id: subcategoryIdAsInt },
          }
        : null,
    };

    // Update the product in the database using Prisma
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updatedProductData,
    });

    // Split the product_tags string by commas
    const product_tags_array = product_tags.split(",");

    // Trim whitespace from each tag and create an array of tag objects
    const product_tags_data = product_tags_array.map((tag) => ({
      name: tag.trim(),
    }));

    // Array to store tag IDs
    const tagIds = [];

    for (const tagData of product_tags_data) {
      // Check if tag already exists
      let existingTag = await prisma.tag.findUnique({
        where: { name: tagData.name },
      });

      if (!existingTag) {
        // If tag doesn't exist, create a new one
        existingTag = await prisma.tag.create({ data: tagData });
      }

      // Push the tag ID into the array
      tagIds.push(existingTag.id);
    }

    // Delete existing associations
    await prisma.productTag.deleteMany({
      where: {
        product_id: updatedProduct.id,
      },
    });

    // Create new associations
    for (const tagId of tagIds) {
      await prisma.productTag.create({
        data: {
          product: { connect: { id: updatedProduct.id } },
          tags: { connect: { id: tagId } },
        },
      });
    }

    const productImages = request.files;

    if (productImages && productImages.length > 0) {
      for (const image of productImages) {
        const imagePath = "/storage/" + image.filename;

        await prisma.image.create({
          data: {
            type_id: updatedProduct.id,
            url: imagePath,
            type: IMAGE_TYPE.product,
          },
        });
      }
    }

    return response.json(apiresponse(200, "OK", updatedProduct)).status(200);
  } catch (error) {
    console.error("Error updating product:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateProduct;
