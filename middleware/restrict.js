const { log } = require("console");
const { prisma } = require("../config/prisma");
const { apiresponse } = require("../utils/apiresponse");

const checkPermission = (permissions) => {
  return async (request, response, next) => {
    const userId = request.user.id;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
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
      


      const hasPermissions = permissions.every((permission) =>
        user.roles.some((role) =>
          // console.log(role.permissions)
          role.permissions.some((rolePermission) =>
          // console.log(rolePermission.Permission.permission);
          rolePermission.Permission.slug === permission
          )
        )
      );
      if (!hasPermissions) {
        return response
          .status(404)
          .json(
            apiresponse(
              404,
              `Access forbidden: User is not allowed to perform this action`,
              null
            )
          );
      }

      next();
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(apiresponse(500, "Internal server error", null, error.message));
    }
  };
};

module.exports = checkPermission;
