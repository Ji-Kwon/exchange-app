// config/database.js
const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Create Sequelize instance with MySQL details
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,  // Optional: To see raw SQL queries in the console
  }
);

// Export the instance for use in other files
module.exports = sequelize;
