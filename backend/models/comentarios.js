const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Comentario = dbConnection.define("comentarios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  texto: { type: DataTypes.STRING },
  archivos: { type: DataTypes.STRING },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: { model: "alumnos", key: "id" },
  },
  idPublicacion: {
    type: DataTypes.INTEGER,
    references: { model: "publicaciones", key: "id" },
  },
});

module.exports = { Comentario };
