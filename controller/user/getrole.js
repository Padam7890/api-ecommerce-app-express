const role = require("../../model/roles");
const { apiresponse } = require("../../utils/apiresponse");

const getrole = async(request,response)=>{
    try {
        const roles = await role.findMany({});
        return response.json(apiresponse(200, "roles", roles, "roles"));
        
    } catch (error) {
        response.json(apiresponse(500, "roles error", error, "roles error"));
        
    }
}

module.exports = getrole;