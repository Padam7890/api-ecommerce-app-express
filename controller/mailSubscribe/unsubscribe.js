const subscribe = require("../../model/subscribe");
const { apiresponse } = require("../../utils/apiresponse");

const unsubscribe = async (request, response)=>{
    try {
        const { id } = request.params;
        const unsubscribe = await subscribe.delete({
            where: {
                id: parseInt(id),
            },
        });
        return response.json(apiresponse(200, "Unsubscribe sucessfully ", unsubscribe, "unsubscribe"));        
    } catch (error) {
        response.json(apiresponse(505, "unsubscribe error", error, "unsubscribe error"));
    }
}

module.exports = unsubscribe;