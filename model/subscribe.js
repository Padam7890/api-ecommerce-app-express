
const { prisma } = require("../config/prisma")

const subscribe = prisma.subscribe;

module.exports = subscribe;