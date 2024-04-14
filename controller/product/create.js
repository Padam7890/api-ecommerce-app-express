const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

const createProduct = async (request, response) => {
  try {
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
    

    // Convert string to boolean value
    is_featured = is_featured === "true" ? true : false;

    // Convert string to int
    product_sku = parseInt(product_sku, 10);
    product_quantity = parseInt(product_quantity, 10);

    // Convert string to decimal value
    product_weight = parseFloat(product_weight);
    product_size = parseFloat(product_size);

    // Split the product_tags string by commas
    const product_tags_array = product_tags.split(",");

    // Trim whitespace from each tag and create an array of tag objects
    const product_tags_data = product_tags_array.map((tag) => ({
      name: tag.trim(),
    }));

    // Create tags and handle duplicates
    const result = await prisma.tag.createMany({
      data: product_tags_data,
      skipDuplicates: true,
    });

    const { errors } = result;
    // console.log(createdTags);

    // Retrieve the IDs and names of the created tags
    const createdTags = await prisma.tag.findMany({
      where: {
        name: { in: product_tags_data.map((tag) => tag.name) },
      },
    });

    console.log(createdTags);

    // Check for errors while creating tags
    if (errors && errors.length > 0) {
      return response
        .status(500)
        .json({ error: "Error creating tags", errors });
    }

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

    // Define the product data
    const productData = {
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

    // Save the product information in the database using Prisma
    const product = await prisma.product.create({
      data: productData,
    });

    // Retrieve the IDs of the created tags
    const tagIds = createdTags.map((tag) => tag.id);
    console.log(tagIds);

    // Associate the product with the tags using the ProductTag junction table
    for (const tagId of tagIds) {
      await prisma.productTag.create({
        data: {
          product: { connect: { id: product.id } },
          tags: { connect: { id: tagId } },
        },
      });
    }

    // Retrieve product images
    const productImages = request.files || [];

    if (productImages.length > 0) {
      for (const image of productImages) {
        const imagePath = "/storage/" + image.filename;
        await prisma.image.create({
          data: {
            type_id: product.id,
            url: imagePath,
            type: IMAGE_TYPE.product,
          },
        });
      }
    }
    response.json({
      message: "Product added successfully",
      product,
      images: productImages,
      tags: createdTags,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};
module.exports = createProduct;
