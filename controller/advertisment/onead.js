const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const editad = async(request,response)=>{
    //response edit request
    try {
        const {id} = request.params;
        const editad = await ad.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return response.status(200).json(apiresponse(200, "advertisment", editad, "advertisment"));
        
    } catch (error) {
        response.status(500).json(apiresponse(505, "ad error", error, "ad error"));
        
    }
}

module.exports = editad;