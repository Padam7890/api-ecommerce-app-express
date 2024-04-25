const { exclude } = require("../../config/prisma");
const { findFirst } = require("../../model/order");
const user = require("../../model/user");
const { get } = require("../../routes/userRoute");
const { apiresponse } = require("../../utils/apiresponse");

const getuserdetails = async (request, response) => {
  try {
    const userId = request.user.id;
    console.log(userId);
    const getuser = await user.findFirst({
      where: {
        id: parseInt(userId),
      },
      include: {
        roles: true,
      },
    });

    const getuserwithoutpassword = exclude(getuser, ["password"]);

    console.log(getuserwithoutpassword);
    return response.json(
      apiresponse(
        200,
        "User Fetched Sucessfully",
        getuserwithoutpassword,
        "user"
      )
    );
  } catch (error) {
    console.log(error);
    return response.json(
      apiresponse(500, "User Fetching Error", error, "user")
    );
  }
};

module.exports = getuserdetails;
