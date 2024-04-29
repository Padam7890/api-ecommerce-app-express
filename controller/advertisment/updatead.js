const saveimagePath = require("../../config/imagepath");
const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const updatead = async (request, response) => {
  try {

    //get all details from request
    const { id } = request.params;
    const { Title, subtitle, description, startTime, endTime, imageUrl } =
      request.body;

    console.log(request.body);

    //time fomating before updating to database
    const timestart = startTime ? new Date(startTime).toISOString() : null;
    const timeend = endTime ? new Date(endTime).toISOString() : null;

    const image = request.cloudinaryUrl;
    let imagePath = imageUrl;

    //check if new image is uploaded
    if (image) {
      imagePath = image;
    }

    //update to database advertisment
    const adupdate = await ad.update({
      where: {
        id: parseInt(id),
      },
      data: {
        Title,
        subtitle,
        description,
        startTime: timestart,
        endTime: timeend,
        url: imagePath,
      },
    });

    //Sucess responses
    response
      .status(200)
      .json(apiresponse(200, "Advertisement updated successfully", adupdate));
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = updatead;
