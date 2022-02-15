const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Alumno = dbConnection.define("alumnos", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  institucion: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  estado: { type: DataTypes.BOOLEAN },
  idGrupo: {
    type: DataTypes.INTEGER,
    references: { model: "grupos", key: "id" },
  },
});

module.exports = { Alumno };
