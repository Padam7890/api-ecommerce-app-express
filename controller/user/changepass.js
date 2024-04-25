const { prisma } = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const { apiresponse } = require("../../utils/apiresponse");
const changepassword = async (request, response) => {
  try {
    //get new password and old password
    const { password, old_password } = request.body;
    console.log(request.body);
    //check old password of user correct or not
    const user = await prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
    });
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(old_password, user.password);

    if (!isPasswordCorrect) {
      return response.status(400).json({
        message: "Old password is incorrect",
      });
    }
    //hash new password
    const hashedPassword = await bcrypt.hash(password, 12);
    //update password
    await prisma.user.update({
      where: {
        id: request.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    response.json(apiresponse(200, "Password updated successfully"));
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};
module.exports = changepassword;
