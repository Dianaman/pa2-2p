const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {

});

Users.sync({force: true});
module.exports = Users;