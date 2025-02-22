require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

// Test Route
app.get('/', (req, res) => res.send('API Running'));

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
