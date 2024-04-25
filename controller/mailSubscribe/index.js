const subscribe = require("../../model/subscribe");
const user = require("../../model/user");
const { apiresponse } = require("../../utils/apiresponse");
const sendEmail = require("../../utils/email");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const mailsubscribe = async (request, response) => {
  try {
    const { email } = request.body;
    const checkemaildb = await subscribe.findUnique({
      where: {
        email: email,
      },
    });

    if (checkemaildb) {
      return response.json(apiresponse(400, "Email already subscribed", email));
    }

    const getsubscribe = await subscribe.create({
      data: {
        email,
      },
    });

    const url = "127.0.0.1:3000";
    const unsubcribelink = `${request.protocol}://${url}/unsubscribe/${getsubscribe.id}`;

    const subscribeTemplate = fs.readFileSync(
      path.join(__dirname, "../../templates", "subscribe_msg.ejs"),
      "utf8"
    );

    const emailHTML = await ejs.render(subscribeTemplate, {
      unsubcribelink: unsubcribelink,
    });

    try {
      // Send confirmation email
      await sendEmail({
        to: email,
        subject: "Thank You for Subscribing to Us",
        html: emailHTML,
      });
      return response.json(
        apiresponse(
          200,
          "You are now subscribed to our newsletter",
          getsubscribe
        )
      );
    } catch (error) {
      console.log(error);
      return response.status(404).json(apiresponse(404, "Sending failed"));
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(apiresponse(500, "Internal Server Error", error));
  }
};

module.exports = mailsubscribe;
