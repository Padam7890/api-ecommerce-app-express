const logo = require("../../model/logo");
const { apiresponse } = require("../../utils/apiresponse");

const logoone = async (request, response) => {
  try {
    const { id } = request.params;
    const getlogo = await logo.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return response.json(apiresponse(200, "logo", getlogo, "logo"));
  } catch (error) {
    response.status(505).json(apiresponse(505, "logo error", error, "logo error"));
  }
};

module.exports = logoone;
