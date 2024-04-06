const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");

const logoList = async(request, response)=>{
    try {
        const getLogo = await logo.findMany({});
        return response.json(apiresponse(200, "logo", getLogo, "logo"));
        
    } catch (error) {
        response.json(apiresponse(500, "logo error", error, "logo error"));
    }
}

module.exports = logoList;