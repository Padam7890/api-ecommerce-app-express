
const { IMAGE_TYPE } = require("../constants/enums");
const image = require("../model/image");

const getproductimages = async (productsWithImages)=>{
    
    // Fetch all images where type is 'Product'
    const productImages = await image.findMany({
        where: {
          type: IMAGE_TYPE.product,
        },
      });
  
      // Create a map to associate product ids with their respective images
      const productImagesMap = productImages.reduce((acc, image) => {
        if (!acc[image.type_id]) {
          acc[image.type_id] = [];
        }
        acc[image.type_id].push(image);
        return acc;
      }, {});

  
      // Merge product information with their associated images
      const productsWithImagesInfo = productsWithImages.map((product) => ({
        ...product,
        images: productImagesMap[product.id] || [], // Assign associated images or an empty array if none found
      }));
      return productsWithImagesInfo;
}

module.exports = getproductimages;
