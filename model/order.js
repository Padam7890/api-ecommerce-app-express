const { prisma } = require("../config/prisma");

const order = prisma.order;

module.exports = order;