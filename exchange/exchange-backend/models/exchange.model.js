const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Exchange = sequelize.define('Exchange', {
    exchange_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    host_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'hosts',
            key:'host_id'
        },
        onDelete:'CASCADE'
    },
    title:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    duration:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    max_volunteers:{
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true,
    tableName: 'exchanges',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports= Exchange;