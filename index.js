const express = require("express");
const cors = require("cors");
const cookieparser = require('cookie-parser');
const { spawnSync } = require('child_process');


const dotenv = require("dotenv");
const LoadRoutes = require("./routes/router");
const { seedRoles, seedPermissions, seedRolePermissions } = require("./prisma/seed");
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieparser());



//limit the number of json requests
app.use(
  express.json({
    limit: "20kb",
  })
);

app.use(express.urlencoded({
  extended: true,
  limit: "20kb",
}));

app.use("/storage", express.static("storage"));

LoadRoutes(app);

//seeders 
app.post('/seed', async (req, res) => {
  try {
    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();

    res.json({ message: 'Seed data inserted successfully' });
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/seed', (req,res)=> {

  return res.json({ message: "hey"})
})


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
