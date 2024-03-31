const jwt = require("jsonwebtoken");

const checkAuth = (request, response, next) => {
  let token = request.headers.authorization;
  if (!token) {
    response.status(401).json({ message: "Not Logged in" });
    return;
  }

  try {
    if (token) {
      token = token.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user_id = decoded.id;
    } else {
      response.status(401).json({ message: "Not Logged in" });
    }

    next();
  } catch (error) {
    response.status(401).json({ message: "Invalid token" });
  }
};
module.exports = checkAuth;
