const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const port = process.env.PORT;

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

app.use("/stud", studentRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
