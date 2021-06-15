const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
    // dialectOptions:{
    //     ssl:{
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
})

module.exports = sequelize;