const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const createad = async (request, response) => {
  try {
    //get request from body
    const { Title, subtitle, description, startTime, endTime } = request.body;
    console.log(request.body);
    
    const image = request.cloudinaryUrl;
    console.log(image);


   //date convert to isostring format
    const timestart = startTime ?  new Date(startTime).toISOString(): null;
    const timeend = endTime ? new Date(endTime).toISOString():null;

    //insert data to database
    const adinsert = await prisma.$transaction([
      ad.create({
        data: {
          Title,
          subtitle,
          description,
          startTime: timestart,
          endTime: timeend,
          url: image,
        },
      }),
    ]);

    //sucess responses
    return response.json(apiresponse(200, "Sucessfully inserted data", adinsert));

  } catch (error) {
    //error responses
    console.log(error);
    response.json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = createad;