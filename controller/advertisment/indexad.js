const { prisma } = require("../../config/prisma");
const ad = require("../../model/ad");
const { apiresponse } = require("../../utils/apiresponse");

const getadvertisment = async (request, response) => {
  try {
    const advertisment = await ad.findMany({});
    return response.json(apiresponse(200, "advertisment", advertisment, "advertisment"));

  } catch (error) {
    console.log(error);
    response.json(apiresponse(505, "advertisment error", error, "advertisment error"));

  }
};

module.exports = getadvertisment;