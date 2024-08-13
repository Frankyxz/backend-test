const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = 8083;

app.use(cors());

app.use(express.json({ limit: "500mb" })); // Add this line to parse incoming JSON data

app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 100000,
  })
);

app.use(express.json());

const studentRoutes = require("./routes/studentRoute");

app.use("/user", studentRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
