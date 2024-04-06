const fs = require("fs/promises");
const { prisma } = require("../../config/prisma");
const uploadimage = require("../../model/image");
const { apiresponse } = require("../../utils/apiresponse");

const deleteimage = async (request, response) => {
  const { id } = request.params;
  const image = await uploadimage.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!image) {
    return response.json(apiresponse(400,"image not found"))
  }  
  
  try {
    const filepath = '.' +  image.url
    await fs.unlink(filepath);
  } catch (error) {
    console.error("Unable to unlink/delete image:", image.url, error);
    return response.json(apiresponse(500,"failed to delete image"))

  }

  // Delete the image record from the database
  try {
    await uploadimage.delete({
      where: {
        id: parseInt(id),
      },
    });

    return response.json(apiresponse(200,"image deleted successfull"))

  } catch (error) {
    console.error("Failed to delete image from database:", error);
    return response.json(apiresponse(500,"failed to delete image"))

  }
};

module.exports = deleteimage;
