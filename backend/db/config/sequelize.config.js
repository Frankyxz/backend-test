const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  database: "nfc_sample",
  dialect: "mysql",
  username: "root",
  password: "",
  timezone: "+08:00", // eAsia/Manila timezone
  alter: false,
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((e) => {
    console.error("Database synchronization failed: " + e);
  });

module.exports = sequelize;
