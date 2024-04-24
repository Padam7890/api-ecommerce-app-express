const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

async function getallSubcategory(request, response) {

  const subcat = await prisma.subcategory.findMany({
    include: {
      category: true,
    },
  });


  response.json({
   subcategory: subcat
  });
}

module.exports = getallSubcategory;
