const { prisma } = require("../../config/prisma");
const banner = require("../../model/banner");
const { apiresponse } = require("../../utils/apiresponse");

const bannerindex = async (request, response) => {
  try {
    const bnner = await banner.findMany({});
    return response.json(apiresponse(200, "banner", bnner, "banner"));
  } catch (error) {
    response.status(505).json(apiresponse(505, "banner error", error, "banner error"));
  }
};
module.exports = bannerindex;
