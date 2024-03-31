const { prisma } = require("../../config/prisma");
const fs = require('fs/promises'); 

async function  deletesubcategory(request, response) {
    const { id } = request.params;
    const subcat = await prisma.subcategory.delete({ where: { id: parseInt(id) } });

    //delete old product images in the database/storage  using prisma
  const oldImages = await prisma.image.findMany({
    where: {
      type_id: parseInt(id),
      type: "Subcategory",
    },
  });
  //delete old product images in the database
  await prisma.image.deleteMany({
    where: {
      type_id: parseInt(id),
      type: "Subcategory",
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