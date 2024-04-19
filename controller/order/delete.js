const { prisma } = require("../../config/prisma");
const billingAddress = require("../../model/billingAddress");
const order = require("../../model/order");
const orderItem = require("../../model/orderitem");
const { apiresponse } = require("../../utils/apiresponse");

const deleteorder = async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);
    const deleteorderanditem = await prisma.$transaction([
       orderItem.deleteMany({
        where: {
          order_id: parseInt(id),
        },
      }),
       billingAddress.deleteMany({
        where: {
          order_id: parseInt(id),
        },
      }),
       order.delete({
        where: {
          id: parseInt(id),
        },
      }),
    ]);
    return response.json(
      apiresponse(
        200,
        "Order Deleted successfully ",
        deleteorderanditem,
        "deleteorder"
      )
    );
  } catch (error) {
    console.log(error);
    return response.json(
      apiresponse(505, "error deleting order", error, "deleteorder error")
    );
  }
};

module.exports = deleteorder;
