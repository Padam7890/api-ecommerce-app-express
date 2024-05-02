const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const { hashPassword } = require("../../utils/passwordhash");

const newuserStore = async (request, response) => {
  try {
    const { email, name, password, roles } = request.body;

    const convertroles = parseInt(roles, 10);

    // check email already exist or not
    const getuser = await user.findUnique({
      where: {
        email: email,
      },
    });

    if (getuser) {
      return response
        .status(400)
        .json(apiresponse(400, "Email already existed"));
    }
    //hash password

    const encryptPassword = await hashPassword(password);
    try {
      const newuser = await user.create({
        data: {
          name,
          email,
          password: encryptPassword,
          roles: {
            connect: {
              id: convertroles,
            },
          },
        },
      });
      return response.json(
        apiresponse(200, "User created successfully", newuser)
      );
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(apiresponse(500, "Internal server error", null, error.message));
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = newuserStore;
