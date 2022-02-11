const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Usuario } = require("./usuarios");

const Grupo = dbConnection.define("grupos", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  numeroAlumnos: { type: DataTypes.INTEGER },
  estado: { type: DataTypes.BOOLEAN },
});

Grupo.belongsToMany(Usuario, {
  through: "usuarios_grupo",
  as: "usuarios",
  foreignKey: "grupos_id",
});

module.exports = { Grupo };
