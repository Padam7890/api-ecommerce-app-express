const dbmenu = require("../../model/menu");
const { apiresponse } = require("../../utils/apiresponse");

const deletemenu = async(request,reponse)=>{
    try {
        const {id} = request.params;
        const deletemenu = await dbmenu.delete({
            where: {
                id: parseInt(id),
            },
        });
        return reponse.json(apiresponse(200, "menu deleted", deletemenu, "menu deleted"));
        
    } catch (error) {
        return reponse.json(apiresponse(505, "menu delete error", error, "menu delete error"));
        
    }
}

module.exports = deletemenu;