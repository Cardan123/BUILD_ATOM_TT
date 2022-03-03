const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Calificacion = dbConnection.define("calificaciones", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  puntuaje: { type: DataTypes.INTEGER },
  observacion: { type: DataTypes.STRING },
  idEjercicio: {
    type: DataTypes.INTEGER,
    references: { model: "ejercicios", key: "id" },
  },
});

module.exports = { Calificacion };
