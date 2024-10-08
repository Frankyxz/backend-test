const router = require("express").Router();
const { where, Op } = require("sequelize");
const sequelize = require("../db/config/sequelize.config");
const { Student } = require("../db/models/associations");

router.route("/add").post(async (req, res) => {
  try {
    const { name, rfid } = req.body;
    const data = await Student.create({
      name: name,
      rfid: rfid,
    });

    res.status(200).send({});
  } catch (err) {
    console.error(err);
    res.status(500).json("Error");
  }
});

router.route("/get").get(async (req, res) => {
  try {
    const data = await Student.findAll();

    if (data) {
      res.send(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error");
  }
});

router.route("/test").get(async (req, res) => {
  try {
    console.log("Test");
    res.status(200).send({ message: "TEEEEEST" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Error");
  }
});

module.exports = router;
