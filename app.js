require('dotenv').config();
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require('./db');

const middleware = require('./middleware');
const controllers = require('./controllers');

app.use('/user', controllers.userController);
app.use(middleware.headers);
app.use('/plant', controllers.plantController); 
app.use('/garden', controllers.gardenController);

dbConnection.authenticate()
    .then(() => dbConnection.sync()) //inside dbconnection.sync({force: true}) to clear table [make sure you take it out before trying to use server]
    .then (() =>{
        app.listen(process.env.PORT, () => {
            console.log(`server is listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) =>{
        console.log(`[Server]: Server Crashed. Error = ${err}`)
    })