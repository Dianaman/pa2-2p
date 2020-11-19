const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Logs = sequelize.define('logs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  usuario: {
    type: DataTypes.INTEGER,
  },
  metodo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: 'TIMESTAMP'
  }
}, {

});

Logs.sync({force: true});
module.exports = Logs;