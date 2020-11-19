const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Materias = sequelize.define('materias', {
  materia: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  cuatrimestre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  cupos: {
    type: DataTypes.INTEGER
  }
}, {

});

Materias.sync({force: true});
module.exports = Materias;