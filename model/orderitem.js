const { prisma } = require("../config/prisma");

const orderItem = prisma.orderItem;

module.exports = orderItem;