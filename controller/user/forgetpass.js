const path = require("path");
const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const sendEmail = require("../../utils/email");
const ejs = require("ejs");
const fs = require("fs");
const resetpasswordtoken = require("../../utils/resetpasswordtoken");
const { sendPasswordResetEmail } = require("../../helper/emailHelpers");

const forgetPass = async (request, response) => {
  try {
    const { email } = request.body;

    const getuser = await user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getuser) {
      return response.status(404).json(
        apiresponse(404, "User not found", null, "User not found")
      );
    }

    const resetToken = await resetpasswordtoken(getuser.id);
    const url = process.env.FRONTEND_URL;

    const resetUrl = `${request.protocol}://${url}/auth/resetpassword/${resetToken}`;

    const emailTemplate = fs.readFileSync(
      path.join(
        __dirname,
        "../../templates",
        "password_reset_email_template.ejs"
      ),
      "utf8"
    );

    const emailHTML = await ejs.render(emailTemplate, {
      getuser: getuser,
      resetUrl: resetUrl,
    });

    await sendPasswordResetEmail(email, emailHTML, getuser, response);

  } catch (error) {
    console.error("Error in forgetPass:", error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = forgetPass;
