//order get from frontend
const order = require("../../model/order");
const { apiresponse } = require("../../utils/apiresponse");

const getorders = async (request, response) => {
  try {
    const { user_id, items, billingAddress } = request.body;
    console.log(request.body);
    const takeorder = await order.create({
      data: {
        user: { connect: { id: user_id } },
        totalPrice: calculateTotalPrice(items),
        orderitems: {
          create: items.map((item) => ({
            product: { connect: { id: item.product_id } },
            quantity: item.quantity,
            price: item.price,
          })),
        },
        billingAddress: {
          create: {
            user: { connect: { id: user_id } },
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            streetAddress: billingAddress.streetAddress,
            state: billingAddress.state,
            zip: billingAddress.zip,
            country: billingAddress.country,
            phone: billingAddress.phone,
            email: billingAddress.email,
            companyName: billingAddress.companyName,
          },
        },
        createdAt: new Date(), // Provide current date and time
      },
    });
    response.json(
      apiresponse(200, "Order created successfully", takeorder, "Order Item")
    );
  } catch (error) {
    console.log(error);
    response.json(apiresponse(500, "Order not created", error));
  }
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

module.exports = getorders;
