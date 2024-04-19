const menu = require("../../model/menu");
const { apiresponse } = require("../../utils/apiresponse");

const oneMenu = async(request, response)=>{
    try {
        const { id } = request.params;
        const getMenu = await menu.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return response.json(apiresponse(200, "menu", getMenu, "menu"));
        
    } catch (error) {
        response.json(apiresponse(505, "menu error", error, "menu error"));
    }
}

module.exports = oneMenu;