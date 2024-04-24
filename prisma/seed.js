const { prisma } = require("../config/prisma");
const { apiresponse } = require("../utils/apiresponse");

const seedRoles = async () => {
  try {
    const rolesData = [
      {
        name: "admin",
      },
      {
        name: "user",
      },
    ];
    const role = await prisma.role.findMany({});
    if (role.length > 0) {
      return;
    } else {
       await prisma.role.createMany({
        data: rolesData,
      });
      console.log("roles seeded successfully");
    }

  } catch (error) {
    console.log(error);
  }
};

const seedPermissions = async () => {
  try {
    const permissonData = [
      {
        permission: "Read",
        slug: "read",
      },
      {
        permission: "Create",
        slug: "create",
      },
      {
        permission: "Update",
        slug: "update",
      },
      {
        permission: "Delete",
        slug: "delete",
      },
    ];
    // check if available or not in db
    const permission = await prisma.permission.findMany({});
    if (permission.length > 0) {
      return;
    } else {
      await prisma.permission.createMany({
        data: permissonData,
      });
      console.log("permissions seeded successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const seedRolePermissions = async () => {
  try {
    const rolepermissiondata = [
      {
        role_id: 7,
        permission_id: 1,
      },
      {
        role_id: 7,
        permission_id: 2,
      },
      {
        role_id: 8,
        permission_id: 2,
      },
    ];

    const rolepermission = await prisma.rolePermission.findMany({});
    if (rolepermission.length > 0) {
      return;
    } else {
      await prisma.rolePermission.createMany({
        data: rolepermissiondata,
      });
    }

    console.log("role permissions seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

const usertoAdmin = async (request, response) => {
  try {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      return response.status(404).json(apiresponse(200, "user not found"));
    }
    // Check if the user is already an admin
    const isAdmin = user.roles.some((role) => role.name === "admin");

    if (isAdmin) {
      return response.status(400).json({ error: "User is already an admin" });
    }

    const adminRole = await prisma.role.findFirst({ where: { name: "admin" } });

    if (!adminRole) {
      return response
        .status(404)
        .json(apiresponse(200, "admin role not found"));
    }
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        roles: {
          connect: {
            id: adminRole.id,
          },
        },
      },
    });
    return response.json(apiresponse(200, "user updated successfully"));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = {
  seedRoles,
  seedPermissions,
  seedRolePermissions,
  usertoAdmin,
};
