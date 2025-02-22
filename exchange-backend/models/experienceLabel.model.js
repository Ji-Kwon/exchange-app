const {DataTypes} = require('sequelize');
const sequelize = require("../config/database");

const ExperienceLabel = sequelize.define('ExperienceLabel',{
    experience_label_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    exchange_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'exchanges',
            key:'exchange_id'
        },
        onDelete:'CASCADE'
    },
    label_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'labels',
            key:'label_id'
        },
        onDelete:'CASCADE'
    }
},{
    timestamps:false,
    tableName:'experience_labels'
});

module.exports = ExperienceLabel;