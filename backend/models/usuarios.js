const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");
const { Grupo } = require("./grupos");

const Usuario = dbConnection.define("usuarios", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING },
  institucion: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  tipo: { type: DataTypes.STRING },
  estado: { type: DataTypes.BOOLEAN },
});

Usuario.belongsToMany(Grupo, {
  through: "usuarios_grupo",
  as: "grupos",
  foreignKey: "usuario_id",
});

module.exports = { Usuario };
