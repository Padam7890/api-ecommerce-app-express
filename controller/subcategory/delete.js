const { prisma } = require("../../config/prisma");
const fs = require('fs/promises'); 
const { IMAGE_TYPE } = require("../../constants/enums");

async function  deletesubcategory(request, response) {
    const { id } = request.params;

     // Check if the category has associated products
  const associatedProducts = await prisma.product.findMany({
    where: {
      subcategory_id: parseInt(id),
    },
  });


  if (associatedProducts.length > 0) {
    return response.status(400).json({
      message: "Cannot delete subcategory. It has associated products",
      subcategory: null,
    });
  }
    const subcat = await prisma.subcategory.delete({ 
        where: { id: parseInt(id) } 
    });

    //delete old product images in the database/storage  using prisma
  const oldImages = await prisma.image.findMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.subCategory,
    },
  });
  //delete old product images in the database
  await prisma.image.deleteMany({
    where: {
      type_id: parseInt(id),
      type: IMAGE_TYPE.subCategory,
    },
  });

  for (const image of oldImages) {
    try {
      await fs.unlink("." + image.url);
      console.log("Successfully deleted image:", image.url);
    } catch (error) {
      console.error("Unable to unlink/delete image:", image.url, error);
    }
  }
    response.json({ 
        subcat: subcat ,
        message: "Subcategory deleted successfully",
    });
}


module.exports = deletesubcategory;