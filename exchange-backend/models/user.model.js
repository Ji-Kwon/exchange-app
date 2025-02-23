const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture: DataTypes.STRING,
  bio: DataTypes.TEXT,
  
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  interests: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },

},{
  timestamps: true,
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;
