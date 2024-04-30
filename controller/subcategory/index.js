const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");
const subcategory = require("../../model/subcategory");
const { apiresponse } = require("../../utils/apiresponse");

async function getallSubcategory(request, response) {

  const subcat = await subcategory.findMany({
    include: {
      category: true,
    },
  });
  return response.status(200).json(apiresponse(200, "Subcategory", subcat, "subcategory"));
}

module.exports = getallSubcategory;
