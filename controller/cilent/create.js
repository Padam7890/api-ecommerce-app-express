const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const clientTestimonial = require("../../model/clientTestimonial");
const { apiresponse } = require("../../utils/apiresponse");

const cilentcreate = async (request, response) => {
  try {
    const { clientName, clientType, clientRating, testimonial } = request.body;
    const clientImage = request.file;

    const saveclientImage = saveimagePath(clientImage);
    if (!clientImage) {
      return response.json("Missing client image");
    }

    const convertclientRating = parseInt(clientRating, 10);

    const client = await clientTestimonial.create({
      data: {
        clientName,
        clientType,
        clientRating: convertclientRating,
        testimonial,
        clientImage: saveclientImage,
      },
    });
    response.json({
      message: "Client Created Successfully",
      client,
    });
  } catch (error) {
    console.log(error);
    response.json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = cilentcreate;
