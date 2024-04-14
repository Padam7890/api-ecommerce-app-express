const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const { hashPassword } = require("../../utils/passwordhash");
const crypto = require("crypto");

const resetPassword = async (request, response) => {
  try {
    const { token } = request.params;
    const { password } = request.body;
    const hastoken = crypto.createHash("sha256").update(token).digest("hex");
    const getuser = await user.findFirst({
      where: {
        passwordResetToken: hastoken,
        passwordResetTokenExpire: {
          gte: new Date(),
        },
      },
    });
    if (!getuser) {
      return response.json(
        apiresponse(404, "Token Invalid or expired", null, "Token not found")
      );
    }

    //update password

    const hashedPass = await hashPassword(password);
    await user.update({
      where: { id: getuser.id },
      data: {
        password: hashedPass,
        passwordResetToken: null,
        passwordResetTokenExpire: null,
      },
    });
    return response.json(apiresponse(200, "Password updated successfully"));
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = resetPassword;
