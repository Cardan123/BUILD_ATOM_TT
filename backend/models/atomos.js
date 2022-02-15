const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Atomo = dbConnection.define("atomos", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  nProtones: { type: DataTypes.INTEGER },
  nElectrones: { type: DataTypes.INTEGER },
  nNeutrones: { type: DataTypes.INTEGER },
  idEjercicio: {
    type: DataTypes.INTEGER,
    references: { model: "ejercicios", key: "id" },
  },
});

module.exports = { Atomo };
