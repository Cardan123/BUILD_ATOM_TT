const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Publicacion } = require("./publicaciones");
const { Usuario } = require("./usuarios");

const Comentario = dbConnection.define("comentarios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  texto: { type: DataTypes.STRING },
  archivos: { type: DataTypes.STRING },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: "id" },
  },
  idPublicacion: {
    type: DataTypes.INTEGER,
    references: { model: Publicacion, key: "id" },
  },
});

module.exports = { Comentario };
