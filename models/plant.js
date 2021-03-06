const {DataTypes} = require('sequelize');//1
const db = require('../db');//2

const Plants = db.define('plant', {//3
    creator: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    plantName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    typeOfPlant: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lightingNeeds: {
        type: DataTypes.STRING,
        allowNull: false
    },
    waterNeeds: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fertilizerNeeds: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    }

})

module.exports = Plants;