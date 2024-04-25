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
            name:"user"
          },
        },
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

module.exports = register;
