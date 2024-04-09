const order = require("../../model/order");
const { apiresponse } = require("../../utils/apiresponse");

const getOrderfromdb = async(request, response)=> {
    try {
        const getorders = await order.findMany({
            include: {
                user: true, 
                orderitems: { 
                    include: {
                        product: true
                    }
                }
            }
        });

        response.json(apiresponse(200, "Successfully Fetched Orders", getorders , "order"))
        
    } catch (error) {
        response.json(apiresponse(500, "order error", error, "order error"))
    }
}

module.exports = getOrderfromdb;