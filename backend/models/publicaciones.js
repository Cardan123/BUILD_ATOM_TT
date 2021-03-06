const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Publicacion = dbConnection.define("publicaciones", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  texto: { type: DataTypes.STRING },
  archivos: { type: DataTypes.STRING },
  idGrupo: {
    type: DataTypes.INTEGER,
    references: { model: "grupos", key: "id" },
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: { model: "alumnos", key: "id" },
  },
});

module.exports = { Publicacion };
