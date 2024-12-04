const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user').User;

const Consulta = sequelize.define('Consulta', {
  consulta_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'),
    defaultValue: 'pendiente'
  },
  creada_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'consultas',
  timestamps: false
});

module.exports = Consulta;