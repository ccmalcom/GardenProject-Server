const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})