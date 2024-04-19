const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const createad = async (request, response) => {
  try {
    const { Title, subtitle, description, startTime, endTime } = request.body;
    console.log(request.body);
    const url = request.file;


    const timestart = startTime ?  new Date(startTime).toISOString(): null;
    const timeend = endTime ? new Date(endTime).toISOString():null;

    if (!url) {
      return response
        .status(400)
        .json(apiresponse(400, "Image not provided", null));
    }
    const imagePath = saveimagePath(url);
    const adinsert = await prisma.$transaction([
      ad.create({
        data: {
          Title,
          subtitle,
          description,
          startTime: timestart,
          endTime: timeend,
          url: imagePath,
        },
      }),
    ]);
    return response.json(apiresponse(200, "Sucessfully inserted data", adinsert));

  } catch (error) {
    console.log(error);
    response.json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = createad;