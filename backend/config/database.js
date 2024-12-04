const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('legalconsult', 'root', '12345', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Importar modelos
    const User = require('../models/user').User;
    const Consulta = require('../models/consulta');

    // Sincronizar modelos
    await sequelize.sync({ force: false });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;