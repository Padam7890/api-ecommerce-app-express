
const { prisma } = require("../config/prisma")

const billingAddress = prisma.billingAddress;

module.exports = billingAddress;
