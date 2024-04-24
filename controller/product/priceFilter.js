
const product = require("../../model/product");
const {apiresponse} = require("../../utils/apiresponse") ;
const getproductimages = require("../../utils/dbimage.js");


const priceFilter = async(request, response)=>{
   try {
     const { min, max } = request.query;

     console.log(min,max);
     const getPrice = await product.findMany({
       where: {
        regular_price: {
           gte: parseInt(min),
           lte: parseInt(max),
         },
       },
       include: {
         category: true,
         subcategory: true,
         ProductTag: {
           include: {
             tags: true,
           },
         },
         images:true,
       },
     });
     
     if (getPrice.length === 0) {
       return response.json(apiresponse(404, "Product Not Found",));
     }

     return response.json(apiresponse(200, "products", getPrice, "price filter"));
    
   } catch (error) {
     response.json(apiresponse(500, "price filter error", error, "price filter error"));
   }
}

module.exports = priceFilter;