const Express = require('express');
const app = Express();
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);

})