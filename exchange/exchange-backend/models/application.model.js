const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
    application_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    volunteer_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'volunteers',
            key:'volunteer_id'
        },
        onDelete:'CASCADE'
    },
    exchange_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'exchanges',
            key:'exchange_id'
        },
        onDelete:'CASCADE'
    },
    status:{
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending'
    }
},{
    timestamps: true,
    tableName: 'applications',
    createdAt: 'applied_at',
    updatedAt: false
});

module.exports = Application;