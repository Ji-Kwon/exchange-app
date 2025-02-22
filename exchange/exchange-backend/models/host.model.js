const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Host = sequelize.define('Host',{
    host_id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'user_id'
        },
        onDelete:'CASCADE'
    },
    organisation_name: DataTypes.STRING,
    organisation_website: DataTypes.STRING,
    contact_number:DataTypes.STRING,
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    timestamps:true,
    tableName:'hosts',
    createdAt: 'created_at',     
    updatedAt: 'updated_at'
});

module.exports = Host;