const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");
const { deletefile } = require("../../utils/filesystem");

const deletebanner = async (request, response) => {
  try {
    const { id } = request.params;
    
    const delbanner = await banner.delete({
      where: {
        id: parseInt(id),
      },
    });


    return response.status(200).json(
      apiresponse(200, "banner Deleted", delbanner, "banner")
    );
  } catch (error) {
    return response.staus(500).json(
      apiresponse(505, "error deleting banner", error, "banner error")
    );
  }
};

module.exports = deletebanner;
