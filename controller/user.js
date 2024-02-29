const { prisma } = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(request, response) {
  try {
    const { name, email, password } = request.body;

    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // If the email already exists, respond with an error message
    if (existingUser) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const jwtToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);

    response.json({ message: 'Success', token: jwtToken });
  } catch (error) {
    console.error('Error during registration:', error);
    response.status(500).json({ error: 'Internal server error' });
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

  const jwtToken = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });


  response.json({ message: "Success", token: jwtToken, user: userExists });
}


module.exports = {
  register,
  login,
};




