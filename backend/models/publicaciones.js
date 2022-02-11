const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Grupo } = require("./grupos");
const { Usuario } = require("./usuarios");

const Publicacion = dbConnection.define("publicaciones", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  texto: { type: DataTypes.STRING },
  archivos: { type: DataTypes.STRING },
  idGrupo: { type: DataTypes.INTEGER, references: { model: Grupo, key: "id" } },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: "id" },
  },
});

module.exports = { Publicacion };
