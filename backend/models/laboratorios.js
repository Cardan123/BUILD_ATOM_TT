const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const Laboratorio = dbConnection.define("laboratorios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  idGrupo: {
    type: DataTypes.INTEGER,
    references: { model: "grupos", key: "id" },
  },
});

module.exports = { Laboratorio };
