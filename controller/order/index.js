const { exclude } = require("../../config/prisma");
const order = require("../../model/order");
const { apiresponse } = require("../../utils/apiresponse");

const getOrderfromdb = async (request, response) => {
  try {
    const getorders = await order.findMany({
      include: {
        user: true,
        orderitems: {
          include: {
            product: {
              include: {
                category: true,
                subcategory: true,
                images: true,
              },
            },
          },
        },
        billingAddress: true,
      },
    });

    const orderswithourpass = getorders.map((order) => ({
      ...order,
      user: exclude(order.user, "password"),
    }));

    response.json(
      apiresponse(200, "Successfully Fetched Orders", orderswithourpass, "order")
    );
  } catch (error) {
    throw new Error(error)
    response.json(apiresponse(500, "order error", error, "order error"));
  }
};

module.exports = getOrderfromdb;
