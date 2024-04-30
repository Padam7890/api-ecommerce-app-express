const { response } = require("express");
const { apiresponse } = require("../../utils/apiresponse");
const order = require("../../model/order");
const product = require("../../model/product");

const getdashboarddetails = async (request, response) => {
  try {
    const gettotalorder = await order.count();

    const previousWeekOrder = await order.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lte: new Date(Date.now()),
        },
      },
    });

    const twoWeekAgoOrder = await order.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    let checkpercentage;
    if (twoWeekAgoOrder === 0) {
      // If there were no orders two weeks ago, consider a 100% increase
      checkpercentage = 100 ;
    } else {
      checkpercentage =
        ((previousWeekOrder - twoWeekAgoOrder) / twoWeekAgoOrder) * 100;
    }

    const totalProfits = await order.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    return response.status(200).json({
      message: "Success",
      data:{
        percentages: checkpercentage || 0,
        totalOrder: gettotalorder,
        totalProfits: totalProfits._sum.totalPrice || 0,
      }
     
    });
  } catch (error) {
    response
      .status(500)
      .json(apiresponse(500, "total order error", error, "total order error"));
  }
};

module.exports = getdashboarddetails;
