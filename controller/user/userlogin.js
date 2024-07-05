const { prisma } = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../../utils/passwordhash");
const { apiresponse } = require("../../utils/apiresponse");

async function login(request, response) {
  const { email, password } = request.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      favourites: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!userExists) {
    return response.status(404).json(apiresponse(404, "User not found"));
  }

  const isPasswordValid = await bcrypt.compare(password, userExists.password);

  if (!isPasswordValid) {
    return response.status(404).json({ message: "Incorrect Password" });
  }

  // Sign the JWT token with user ID and roles
  const jwtToken = jwt.sign(
    { id: userExists.id, roles: userExists.roles },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );
  //creating refresh token not that expiry
  const refreshToken = jwt.sign(
    { id: userExists.id, roles: userExists.roles },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  // console.log("refreshToken" + refreshToken, "accesstoken" + jwtToken);

  response.cookie('myCookie', refreshToken, {
    domain: 'localhost',
    path: '/',
    secure: false,
    httpOnly: true
  });

  response.json({
    message: "Success",
    refreshToken: refreshToken,
    accessToken: jwtToken,
    user: userExists,
  });
  // response.cookie("refreshToken", "refreshToken");
}

module.exports = login;
