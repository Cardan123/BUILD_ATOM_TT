const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Ejercicio } = require("./ejercicios");

const Calificacion = dbConnection.define("calificaciones", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  puntuaje: { type: DataTypes.INTEGER },
  observacion: { type: DataTypes.INTEGER },
  idEjercicio: {
    type: DataTypes.INTEGER,
    references: { model: Ejercicio, key: "id" },
  },
});

module.exports = { Calificacion };
