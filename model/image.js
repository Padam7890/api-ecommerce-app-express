const { prisma } = require("../config/prisma");

const uploadimage = prisma.image;

module.exports = uploadimage;