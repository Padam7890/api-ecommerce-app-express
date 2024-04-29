const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");

async function getallSubcategory(request, response) {

  const subcat = await subcategory.findMany({
    include: {
      category: true,
    },
  });


  response.json({
   subcategory: subcat
  });
}

module.exports = getallSubcategory;
