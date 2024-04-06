const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");

const getonebanner = async(request,response)=> {
    try {
        const {id} = request.params;
        const getbanner = await banner.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return response.json(apiresponse(200, "banner", getbanner, "banner"));
        
    } catch (error) {
        response.json(apiresponse(505, "banner error", error, "banner error"));
        
    }
}

module.exports = getonebanner;