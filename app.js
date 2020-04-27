const express = require('express');
const app = express();
const shoppingRoutes = require('./shoppingRouter');


app.use(express.json())
app.use('/items', shoppingRoutes)

app.use((err, req, res, next) => {;
    let status = err.status || 500;
    let msg = err.msg;
    return res.status(status).json({err})
})


module.exports = app;
