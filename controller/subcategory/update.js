const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const fs = require("fs/promises");


async function updatesubcategory(request, response) {
    const { id } = request.params;
    const { subcategory_name, category_id, imageUrl } = request.body;
     
    const image = request.file;
    let imagePath = imageUrl;

    if (image) {
      imagePath = saveimagePath(image);
    }
    else{
      console.log("No new image uploaded.");
    }

    const categoryId = parseInt(category_id, 10);
    
    const subcat = await prisma.subcategory.update({
      where: { id: parseInt(id) },
      data: {
        subcategory_name: subcategory_name,
        category_id: categoryId,
        imageUrl:imagePath,
      },
    });
    
    response.json({
      subcategory: subcat,
      message: "Subcategory updated successfully",
      image: { url: imagePath }, // Return the updated image URL

    });
  }

  module.exports = updatesubcategory;