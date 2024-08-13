const sequelize = require("../config/sequelize.config");
const { DataTypes } = require("sequelize");

const Student = sequelize.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  rfid: {
    type: DataTypes.STRING,
  },
});

module.exports = Student;
