const {DataTypes} = require('sequelize');//1
const db = require('../db');//2

const Garden = db.define('mine', {//3
    Garden_id: {
        type: DataTypes.INTEGER,
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

module.exports = Garden;