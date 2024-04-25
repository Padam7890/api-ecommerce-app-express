const { log } = require("console");
const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const { exclude } = require("../../config/prisma");

const getAlluser = async (request, response) => {
  try {
    const users = await user.findMany({
      include: {
        roles: {
          include: {
            permissions: {
              include: {
                Permission: true,
              },
            },
          },
        },
      },
    });
    const usersWithoutPassword = users.map((user) =>
      exclude(user, ["password"])
    );

    return response.json(
      apiresponse(200, "User Fetched Sucessfully", usersWithoutPassword, "user")
    );
  } catch (error) {
    console.log(error);
    return response.json(
      apiresponse(500, "User Fetching Error", error, "user")
    );
  }
};
module.exports = getAlluser;
