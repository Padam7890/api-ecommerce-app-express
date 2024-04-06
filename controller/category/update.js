const { IMAGE_TYPE } = require("../../constants/enums");
const { apiresponse } = require("../../utils/apiresponse");
const category = require("../../model/category");
const image = require("../../model/image");
const { deletefiles } = require("../../utils/filesystem");
const { log } = require("console");
const saveimagePath = require("../../config/imagepath");
const uploadimage = require("../../model/image");

async function updateCategory(request, response) {
  try {
    const { id } = request.params;
    const { category_name } = request.body;
    const image = request.file;
    console.log(request.body);

    // Check if image is provided
    if (!image) {
      return response.json(apiresponse(404, "Image is required" ))
    }

    // const imagePath = "/storage/" + image.filename;
    const imagePath =   saveimagePath(image)

    // Update category name
    const updatedCategory = await category.update({
      where: { id: parseInt(id) },
      data: { category_name },
    });

     console.log(category_name);

    // Delete old category image from storage and database
    const oldImages = await  uploadimage.findMany({
      where: { type_id: parseInt(id), type: "Category" },
    });

    deletefiles(oldImages)

    // Update or create new image record for the category
    const existingImage = await uploadimage.findFirst({
      where: { 
        type_id: parseInt(id), 
        type:IMAGE_TYPE.category,
       },
    });

    if (existingImage) {
      // Update existing image URL
      await uploadimage.update({
        where: { id: existingImage.id },
        data: { url: imagePath },
      });
    } else {
      // Create new image record
      await uploadimage.create({
        data: { type_id: parseInt(id), url: imagePath, type: IMAGE_TYPE.category },
      });
    }
    response.json(apiresponse(200, "Category updated successfully", updatedCategory , "category"));
  } catch (error) {
    console.error("Error updating category:", error);
    response.json(apiresponse(500, "Internal Server Error"))
  }
}

module.exports = updateCategory;
