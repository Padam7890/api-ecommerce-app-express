const user = require("../../model/user");
const { hashPassword } = require("../../utils/passwordhash");
const jwt = require("jsonwebtoken");

async function register(request, response) {
  try {
    const { name, email, password, roles } = request.body;

    const existingUser = await user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return response.status(400).json({
        error: "Email already exists",
      });
    }

    const hashedPass = await hashPassword(password);

    const newUser = await user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
        roles: {
          connect: {
            name: "user",
          },
        },
      },
    });

    // Sign the JWT token with user ID and roles
    const jwtToken = jwt.sign(
      { id: userExists.id, roles: userExists.roles },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    //creating refresh token not that expiry
    const refreshToken = jwt.sign(
      { id: newUser.id, roles: newUser.roles },
      process.env.JWT_REFRESH_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    response.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });

    response.json({
      message: "Success",
      refreshToken: refreshToken,
      accessToken: jwtToken,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    response.status(500).json({ error: "Internal server error" });
  }
}

module.exports = register;
