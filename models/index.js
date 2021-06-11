const UserModel = require('./user');
const PlantModel = require('./plant');
const GardenModel = require('./garden');
const { DataTypes } = require('sequelize/types');

GardenModel.hasMany(PlantModel, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
        name: Garden_id
    }
}); //garden model needs foreign key
PlantModel.belongsTo(GardenModel)

module.exports = {UserModel, PlantModel }//deleted GardenModel