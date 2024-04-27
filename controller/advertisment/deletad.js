const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const deletead = async (request, response) => {
  //get id from request and delete it
  try {
    const { id } = request.params;
    const delad = await ad.delete({
      where: {
        id: parseInt(id),
      },
    });
    return response.json(
      apiresponse(
        200,
        "Advertisment Deleted Sucessfully",
        delad,
        "advertisment"
      )
    );
  } catch (error) {
    return response
      .status(505)
      .json(apiresponse(505, "ad error", error, "ad error"));
  }
};

module.exports = deletead;
