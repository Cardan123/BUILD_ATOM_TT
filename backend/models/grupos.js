const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Grupo = dbConnection.define("grupos", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  numeroAlumnos: { type: DataTypes.INTEGER },
  estado: { type: DataTypes.BOOLEAN },
  idProfesor: {
    type: DataTypes.INTEGER,
    references: { model: "profesores", key: "id" },
  },
});

module.exports = { Grupo };
