const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");


async function updatesubcategory(request, response) {
    const { subcategory_name } = request.body;
    const { category_id } = request.body;
    const { id } = request.params;

    const categoryId = parseInt(category_id, 10);
  
    const subcat = await prisma.subcategory.update({
      where: { id: parseInt(id) },
      data: {
        subcategory_name: subcategory_name,
        category_id: categoryId,
      },
    });
    const image = request.file;

    // Check if image is provided
    if (!image) {
      return response.status(400).json({ error: "Image is required" });
    }

    const imagePath = "/storage/" + image.filename;

      // Delete old category image from storage and database
      const oldImages = await prisma.image.findMany({
        where: {
             type_id: parseInt(id),
              type: "Subcategory" },
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
          type: "Subcategory"
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
          data: { type_id: parseInt(id), url: imagePath, type: "Subcategory" },
        });
      }
    
    response.json({
      subcategory: subcat,
      message: "Subcategory updated successfully",
      image: { url: imagePath }, // Return the updated image URL

    });
  }

  module.exports = updatesubcategory;