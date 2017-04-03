const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const configDb = require('./configDb/database.js');
const routes = require('./routes/routes.js');
const port = process.env.PORT || 8000;


mongoose.Promise = global.Promise;
mongoose.connect(configDb.uri);
const db = mongoose.connection;


app.use(logger('dev'));
app.use('/', routes);


app.listen(port, () => {
    console.log('Server running on http://localhost:' + port);
});
