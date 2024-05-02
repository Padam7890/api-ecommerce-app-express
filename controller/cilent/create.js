const saveimagePath = require("../../config/imagepath");
const { prisma } = require("../../config/prisma");
const clientTestimonial = require("../../model/clientTestimonial");
const { apiresponse } = require("../../utils/apiresponse");

const cilentcreate = async (request, response) => {
  try {
    const { clientName, clientType, clientRating, testimonial } = request.body;
    const clientImage = request.cloudinaryUrl;

    if (!clientImage) {
      return response.status(404).json(apiresponse(404, "Not Found"));
    }

    const convertclientRating = parseInt(clientRating, 10);

    const client = await clientTestimonial.create({
      data: {
        clientName,
        clientType,
        clientRating: convertclientRating,
        testimonial,
        clientImage: clientImage,
      },
    });
    response.status(201).json(apiresponse(201, "Cilent Created Sucessfully", client));
  } catch (error) {
    console.log(error);
    response.status(500).json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = cilentcreate;
