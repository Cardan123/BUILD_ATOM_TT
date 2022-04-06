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
  idAlumno: {
    type: DataTypes.INTEGER,
    references: { model: "alumnos", key: "id" },
  },
  idAtomo: {
    type: DataTypes.INTEGER,
    references: { model: "atomos", key: "id" },
  },
});

module.exports = { Calificacion };
