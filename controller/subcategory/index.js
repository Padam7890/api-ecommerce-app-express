const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

async function getallSubcategory(request, response) {

  const subcat = await prisma.subcategory.findMany({
    include: {
      category: true,
    },
  });
   const subcatwithimages = await Promise.all(subcat.map(async subcat => {
      const images = await prisma.image.findMany({
        where: {
          type_id: subcat.id,
          type:IMAGE_TYPE.subCategory
        }
      });
      
      return {
        ...subcat,
        image: images
      };
    }));


  response.json({
   subcategory: subcatwithimages
  });
}

module.exports = getallSubcategory;
