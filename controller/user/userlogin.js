const { prisma } = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../../utils/passwordhash");

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
    response.json({ message: "User does not exist" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, userExists.password);

  if (!isPasswordValid) {
    response.json({ message: "Incorrect Password" });
    return;
  }

  // Sign the JWT token with user ID and roles
  const jwtToken = jwt.sign(
    { id: userExists.id, roles: userExists.roles },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  response.json({ message: "Success", token: jwtToken, user: userExists });
}

module.exports = login;
