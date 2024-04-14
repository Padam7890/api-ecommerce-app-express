const { prisma } = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const user = require("../model/user");
const { hashPassword } = require("../utils/passwordhash");

async function register(request, response) {
  try {
    const { name, email, password, roles } = request.body;

    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // If the email already exists, respond with an error message
    if (existingUser) {
      return response.status(400).json({
        error: "Email already exists",
      });
    }

    const hashedPass = await  hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
        roles: roles, // Store the roles in the database
      },
    });

    // Sign the JWT token with user ID and roles
    const jwtToken = jwt.sign(
      { id: newUser.id, roles: newUser.roles },
      process.env.JWT_SECRET_KEY
    );

    response.json({ message: "Success", token: jwtToken });
  } catch (error) {
    console.error("Error during registration:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

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

const resetpasswordtoken = async (userId) => {
  const resettoken = crypto.randomBytes(32).toString("hex");
  const tokenhash = crypto.createHash('sha256').update(resettoken).digest("hex");

  try {
    await user.update({
      where: { id: userId },
      data: {
        passwordResetToken: tokenhash,
        passwordResetTokenExpire: new Date(new Date().getTime() + 3600 * 1000) 
      }
    });
    
    return resettoken;
  } catch (error) {
    console.error('Error updating user record:', error);
    throw new Error('Failed to generate reset token');
  }
};


module.exports = {
  register,
  login,
  resetpasswordtoken
};
