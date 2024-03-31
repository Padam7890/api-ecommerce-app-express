const { prisma } = require("../../config/prisma");

async function getsubcaregoryById(request, response) {
    const { id } = request.params;
    try {
      const subcat = await prisma.subcategory.findUnique({
        where: { id: parseInt(id) },
      });
  
      const image = await prisma.image.findFirst({
        where: {
          type_id: subcat.id,
          type:"Subcategory"
        }
      });
  
      if (!subcat) {
        return response.status(404).json({ error: "subcat not found" });
      } 
      
      const subcatwithimage = {
        ...subcat,
        image: image,
      };
  
      response.json({ subcat: subcatwithimage });
    } catch (error) {
      console.error("Error fetching Subcategory and image:", error);
      response.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getsubcaregoryById;
