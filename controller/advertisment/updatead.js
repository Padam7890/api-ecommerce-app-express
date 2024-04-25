const saveimagePath = require("../../config/imagepath");
const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const updatead = async (request, response) => {
  try {
    const { id } = request.params;
    const { Title, subtitle, description, startTime, endTime, imageUrl } =
      request.body;

      console.log(request.body);

    const timestart = startTime ? new Date(startTime).toISOString() : null;
    const timeend = endTime ? new Date(endTime).toISOString() : null;

    const url = request.file;

    let imagePath = imageUrl;

    if (url) {
      imagePath = saveimagePath(url);
      console.log("Saved Image Path:", imagePath);
    } else {
      console.log("No new image uploaded.");
    }
    console.log(imagePath);
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
    console.log(adupdate);
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