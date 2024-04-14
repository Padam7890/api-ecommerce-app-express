const path = require("path");
const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const sendEmail = require("../../utils/email");
const { resetpasswordtoken } = require("../user");
const ejs = require('ejs')
const fs = require('fs')
const crypto = require('crypto');
const { hashPassword } = require("../../utils/passwordhash");


const forgetPass = async (request, response) => {
  try {
    const { email } = request.body;

    const getuser = await user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getuser) {
      return response.json(
        apiresponse(404, "User not found", null, "User not found")
      );
    }

    const resetToken = await resetpasswordtoken(getuser.id);

    const resetUrl = `${request.protocol}://${request.get(
      "host"
    )}/auth/resetpassword/${resetToken}`;


      const emailTemplate = fs.readFileSync(path.join(__dirname, '../../templates', 'password_reset_email_template.ejs'), 'utf8');

      const emailHTML = await ejs.render(emailTemplate, {
          getuser: getuser,
          resetUrl: resetUrl
      });


    try {
      await sendEmail({
        to: email,
        subject: "Password Reset",
        html: emailHTML
      });
      return response.json(
        apiresponse(200, "Password reset link sent to your email")
      );
    } catch (error) {
      try {
        await user.update({
          where: { id: getuser.id },
          data: {
            passwordResetToken: null,
            passwordResetTokenExpire: null,

          },
        });
        return response.json(
          apiresponse(500, "Error sending email  due to this error", error)
        );
      } catch (error) {
        console.error("Error updating user record:", error);
        return response.json(
          apiresponse(500, "Error updating user record", error)
        );
      }
    }

  } catch (error) {
    console.error("Error in forgetPass:", error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

const resetPassword = async (request, response) => {
  try {
    const {token} = request.params;
    const { password } = request.body;
    const hastoken = crypto.createHash('sha256').update(token).digest('hex');
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

      const hashedPass = await  hashPassword(password);
      await user.update({
        where: { id: getuser.id },
        data: {
          password: hashedPass,
          passwordResetToken: null,
          passwordResetTokenExpire: null,

        },
      });
      return response.json(
        apiresponse(200, "Password updated successfully")
      );
   
  
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return response
     .status(500)
     .json(apiresponse(500, "Internal server error", null, error.message));
  }
};

module.exports = {
  forgetPass,
  resetPassword,
};
