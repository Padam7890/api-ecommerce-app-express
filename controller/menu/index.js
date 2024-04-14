const menu = require("../../model/menu");
const { apiresponse } = require("../../utils/apiresponse");

const getallmenu = async(request, response)=>{
     try {
        const getmenus = await menu.findMany({
            include: {
                children:true,
            }

        });
        return response.json(apiresponse(200, "menu", getmenus, "menu"));
        
     } catch (error) {
         response.json(apiresponse(500, "menu error", error, "menu error"));
     }
}

module.exports = getallmenu;