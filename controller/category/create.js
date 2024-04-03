const { prisma } = require("../../config/prisma");
const { IMAGE_TYPE } = require("../../constants/enums");

const createCategory = async (request, response) => {
    // const hu = request.body;
    // console.log(hu);
    const {category_name } =request.body;
    const image = request.file;
    console.log(image);
  
    const imagePath = "/storage/" + image.filename;
    
    // Save the product information in the database using Prisma
    const category = await prisma.category.create({
      data: {
          category_name: category_name,
      },
    });
  
    const imageupload = await prisma.image.create({
      data: {
        url: imagePath,
        type:IMAGE_TYPE.category,
        type_id: category.id
      },
    })
  
   response.json({ 
    message: "Category added successfully",
    category: category,
    image: imageupload,
   });
  };
  
module.exports = createCategory;  