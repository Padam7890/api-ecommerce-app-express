const clientTestimonial = require("../../model/clientTestimonial");
const { apiresponse } = require("../../utils/apiresponse");

const onecilent = async(request, response)=> {
    try {
        const {id} = request.params;
        const onecilent = await clientTestimonial.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return response.json(apiresponse(200, "testimonials", onecilent, "testimonials"));
        
    } catch (error) {
        response.status(505).json(apiresponse(505, "clientTestimonial error", error, "clientTestimonial error"));
        
    }
}

module.exports = onecilent;