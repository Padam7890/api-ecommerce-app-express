const { prisma } = require("../config/prisma");

const productsImages = prisma.productsImages;

module.exports = productsImages;