require('dotenv').config();
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require('./db');

const middleware = require('./middleware');
const controllers = require('./controllers');

app.use(middleware.headers);
app.use('/user', controllers.userController);
app.use('/garden', controllers.plantController);
app.use('/garden/mine', controllers.gardenController);
dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then (() =>{
        app.listen(process.env.PORT, () => {
            console.log(`server is listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) =>{
        console.log(`[Server]: Server Crashed. Error = ${err}`)
    })