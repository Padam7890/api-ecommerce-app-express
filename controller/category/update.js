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
    const { category_name, imageUrl } = request.body;

    let imagePath = imageUrl;
    const image = request.cloudinaryUrl;

    if (image) {
      imagePath = image;
    }

    const updatedCategory = await category.update({
      where: { id: parseInt(id) },
      data: {
        category_name,
        imageUrl: imagePath,
      },
    });

    response.json(
      apiresponse(
        200,
        "Category updated successfully",
        updatedCategory,
        "category"
      )
    );
  } catch (error) {
    console.error("Error updating category:", error);
    response.status(500).json(apiresponse(500, "Internal Server Error"));
  }
}

module.exports = updateCategory;
