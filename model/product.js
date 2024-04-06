const { prisma } = require("../config/prisma");

const product =  prisma.product;

module.exports = product;