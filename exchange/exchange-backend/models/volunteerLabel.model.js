const {DataTypes} = require('sequelize');
const sequelize = require("../config/database");

const VolunteerLabel = sequelize.define('VolunteerLabel',{
    volunteer_label_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    volunteer_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'volunteers',
            key:'volunteer_id'
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
    tableName:'volunteer_labels'
});

module.exports = VolunteerLabel;