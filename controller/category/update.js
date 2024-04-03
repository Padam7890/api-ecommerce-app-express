const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");
const { IMAGE_TYPE } = require("../../constants/enums");

async function updateCategory(request, response) {
  try {
    const { id } = request.params;
    const { category_name } = request.body;
    const image = request.file;

    // Check if image is provided
    if (!image) {
      return response.status(400).json({ error: "Image is required" });
    }

    const imagePath = "/storage/" + image.filename;

    // Update category name
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { category_name },
    });

    // Delete old category image from storage and database
    const oldImages = await prisma.image.findMany({
      where: { type_id: parseInt(id), type: "Category" },
    });

    for (const oldImage of oldImages) {
      try {
        await fs.unlink("." + oldImage.url);
        console.log("Successfully deleted image:", oldImage.url);
        await prisma.image.delete({ where: { id: oldImage.id } });
      } catch (error) {
        console.error("Unable to unlink/delete image:", oldImage.url, error);
      }
    }

    // Update or create new image record for the category
    const existingImage = await prisma.image.findFirst({
      where: { 
        type_id: parseInt(id), 
        type:IMAGE_TYPE.category,
       },
    });

    if (existingImage) {
      // Update existing image URL
      await prisma.image.update({
        where: { id: existingImage.id },
        data: { url: imagePath },
      });
    } else {
      // Create new image record
      await prisma.image.create({
        data: { type_id: parseInt(id), url: imagePath, type: "Category" },
      });
    }

    response.json({
      message: "Category updated successfully",
      category: updatedCategory,
      image: { url: imagePath }, // Return the updated image URL
    });
  } catch (error) {
    console.error("Error updating category:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateCategory;
