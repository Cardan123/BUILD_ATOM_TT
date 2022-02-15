const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Profesor = dbConnection.define("profesores", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  institucion: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  estado: { type: DataTypes.BOOLEAN },
});

module.exports = { Profesor };
