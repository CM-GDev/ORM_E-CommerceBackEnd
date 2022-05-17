const Sequelize = require('sequelize');
require('dotenv').config();



const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    // Database Name
    process.env.DB_NAME,
    // User
    process.env.DB_USER,
    // Password
    process.env.DB_PW,
    {
      //Database location
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
