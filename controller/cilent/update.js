const saveimagePath = require("../../config/imagepath");
const clientTestimonial = require("../../model/clientTestimonial");
const { apiresponse } = require("../../utils/apiresponse");

const updateCilents = async (request, response) => {
  try {
    const { id } = request.params;
    const { clientName, clientType, clientImage, clientRating, testimonial } =
      request.body;

    let imagePath = clientImage;
    const image = request.cloudinaryUrl;

    if (image) {
      imagePath = image;
    }
    const convertclientRating = parseInt(clientRating, 10);

    const testimonialcilent = await clientTestimonial.update({
      where: { id: parseInt(id) },
      data: {
        clientName,
        clientType,
        clientImage: imagePath,
        clientRating: convertclientRating,
        testimonial,
      },
    });
    return response.json(
      apiresponse(
        200,
        "Testimonialcilent Sucessfully",
        "testimonialcilent",
        testimonialcilent
      )
    );
  } catch (error) {
    return response
      .status(505)
      .json(apiresponse(505, "testimonial error", error, "testimonial error"));
  }
};

module.exports = updateCilents;
