const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mensaje = sequelize.define('Mensaje', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  consultaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  remitenteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creadoEn: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'mensajes',
  timestamps: false,
});

module.exports = { Mensaje };