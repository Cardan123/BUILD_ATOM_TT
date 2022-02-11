const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Laboratorio } = require("./laboratorios");

const Ejercicio = dbConnection.define("ejercicios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  tipo: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  idLaboratorio: {
    type: DataTypes.INTEGER,
    references: { model: Laboratorio, key: "id" },
  },
});

module.exports = { Ejercicio };
