const {DataTypes} = require('sequelize');
const sequelize = require("../config/database");

const Label = sequelize.define('Label', {
    label_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM('skill', 'interest'),
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'labels'
});

module.exports = Label;