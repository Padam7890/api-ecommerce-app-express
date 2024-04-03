const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");


async function storesubcategory(request, response) {
    const getalls = request.body;
    console.log(getalls);
    const { subcategory_name } = request.body;
    const { category_id } = request.body;

    const categoryId = parseInt(category_id, 10);
  
    const subcat = await prisma.subcategory.create({
      data: {
        subcategory_name: subcategory_name,
        category_id: categoryId,
      },
    });

    const image = request.file;
    const imagePath = "/storage/" + image.filename;

     const saveimage = await prisma.image.create({
        data: {
          url: imagePath,
          type:IMAGE_TYPE.subCategory,
          type_id: subcat.id
        },
 
     })
    response.json({
      subcategory: subcat,
      message: "Subcategory added successfully",
      image: saveimage,
    });
  }

  module.exports = storesubcategory;