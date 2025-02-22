const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Volunteer = sequelize.define('Volunteer', {
    volunteer_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'user_id'
        },
        onDelete:'CASCADE'
    }
}, {
    timestamps:true,
    tableName: 'volunteers'
});

module.exports = Volunteer;