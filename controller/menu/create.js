const { connect } = require("net");
const dbmenu = require("../../model/menu");
const { apiresponse } = require("../../utils/apiresponse");

const getmenu = async (request, response) => {
  try {
    const {title, parent_id } = request.body;
    const convertparent_id = parseInt(parent_id, 10)
    console.log(request.body);
    
    const createmenu = await dbmenu.create({
      data: {
        title,
        parent_id: convertparent_id
      },
    });

    return response.json(apiresponse(200, "menu", createmenu, "menu"));
  } catch (error) {
    console.log(error);
    return response.json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = getmenu;