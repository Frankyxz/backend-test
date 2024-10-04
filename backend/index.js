const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const net = require("net");
const app = express();

const port = process.env.PORT;

// Add your frontend's origin URL here
// const corsOptions = {
//   origin: "https://backend-test-jlq4.vercel.app", // Allow this origin only
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
//   credentials: true, // Allow cookies and authentication
// };

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json({ limit: "500mb" })); // Add this line to parse incoming JSON data

// app.use(
//   bodyParser.urlencoded({
//     limit: "500mb",
//     extended: true,
//     parameterLimit: 100000,
//   })
// );

// app.use(express.json());

const printerIP = "100.69.104.252"; // Replace with your printer's IP
const printerPort = 9100; // Port 9100 is commonly used for raw print data

// Route to handle print requests
app.post("/print", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send({ error: "No data to print" });
  }

  // Create a TCP connection to the printer
  const client = new net.Socket();
  client.connect(printerPort, printerIP, () => {
    console.log("Connected to printer");
    client.write(data);
    client.end();
  });

  client.on("error", (err) => {
    console.error("Error connecting to printer:", err);
    return res.status(500).send({ error: "Error connecting to printer" });
  });

  client.on("close", () => {
    console.log("Connection to printer closed");
    res.send({ status: "success", message: "Printed successfully" });
  });
});

app.post("/test", (req, res) => {
  console.log("TEEEEEEEEEST");

  res.send({ message: "Test" });
});

const studentRoutes = require("./routes/studentRoute");

app.use("/stud", studentRoutes);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
