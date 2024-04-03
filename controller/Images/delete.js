const fs = require("fs/promises");
const { prisma } = require("../../config/prisma");

const deleteimage = async (request, response) => {
  const { id } = request.params;
  const image = await prisma.image.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!image) {
    return response.status(404).json({
      message: "Image not found",
    });
  }  
  
  try {
    const filepath = '.' +  image.url
    await fs.unlink(filepath);
  } catch (error) {
    console.error("Unable to unlink/delete image:", image.url, error);
    return response.status(500).json({
      message: "Failed to delete image",
    });
  }

  // Delete the image record from the database
  try {
    await prisma.image.delete({
      where: {
        id: parseInt(id),
      },
    });

    return response.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete image from database:", error);
    return response.status(500).json({
      message: "Failed to delete image from database",
    });
  }
};

module.exports = deleteimage;
