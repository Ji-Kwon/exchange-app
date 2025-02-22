const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    exchange_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'exchanges',
            key: 'exchange_id'
        },
        onDelete: 'CASCADE'
    },
    volunteer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'volunteers',
            key: 'volunteer_id'
        },
        onDelete: 'CASCADE'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'reviews',
    createdAt: 'reviewed_at',
    updatedAt: false
});

module.exports = Review;
