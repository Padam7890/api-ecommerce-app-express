const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const LoadRoutes = require("./routes/router");
dotenv.config();

const app = express();

app.use(cors());

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
