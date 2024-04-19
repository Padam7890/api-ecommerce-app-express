const dbmenu = require("../../model/menu");
const { apiresponse } = require("../../utils/apiresponse");

const updatemenu = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, parent_id } = request.body;
    const convertparent_id = parseInt(parent_id, 10);
    console.log(request.body);
    const updatemenu = await dbmenu.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        parent_id: convertparent_id,
      },
    });
    return response.json(apiresponse(200, "menu", updatemenu, "menu"));
  } catch (error) {
    console.log(error);
    return response.json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = updatemenu;