const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Inscripciones = sequelize.define('inscripciones', {
  idAlumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idMateria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nota: {
    type: DataTypes.INTEGER,
  }
}, {
    
});

Inscripciones.sync({force: true});
module.exports = Inscripciones;