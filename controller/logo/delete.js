const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");
const { deletefile } = require("../../utils/filesystem");

const deletelogo = async (request, response) => {
  try {
    const { id } = request.params;

    const logodelete = await logo.delete({
      where: {
        id: parseInt(id),
      },
    });

    return response.json(apiresponse(200, "logo", logodelete, "logo"));
  } catch (error) {
    console.error("Error:", error);
    return response.json(
      apiresponse(505, "error deleting logo", error, "logo error")
    );
  }
};

module.exports = deletelogo;
