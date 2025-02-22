const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        },
        onDelete: 'CASCADE'
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
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'messages',
    createdAt: 'sent_at',
    updatedAt: false
});

module.exports = Message;
