const { prisma } = require("../../config/prisma")
const banner = require("../../model/banner")
const { apiresponse } = require("../../utils/apiresponse")


const bannerindex = async(request,response) =>{
    try {
        const b = await banner.findMany({

        })
        return response.json(apiresponse(200,"banner",b,'banner'))
        
    } catch (error) {
        response.status(500).json({
            error:error.message
        })
        
    }

}

module.exports = bannerindex;