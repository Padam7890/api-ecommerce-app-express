const clientTestimonial = require("../../model/clientTestimonial");
const { apiresponse } = require("../../utils/apiresponse");

const gettestimonial = async (request, response) => {
  try {
    const gettestimonials = await clientTestimonial.findMany({});
    return response.json(
      apiresponse(200, "testimonials", gettestimonials, "testimonials")
    );
  } catch (error) {
    response.json(
      apiresponse(500, "testimonials error", error, "testimonials error")
    );
  }
};

module.exports = gettestimonial;
