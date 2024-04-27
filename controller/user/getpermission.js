const permission = require("../../model/permissions");
const { apiresponse } = require("../../utils/apiresponse");

const getpermissions = async(request,response)=>{
    try {
        const permissions = await permission.findMany({});
        return response.json(apiresponse(200, "permissions", permissions, "permissions"));
        
    } catch (error) {
        response.status(500).json(apiresponse(500, "permissions error", error, "permissions error"));
        
    }
}

module.exports = getpermissions;