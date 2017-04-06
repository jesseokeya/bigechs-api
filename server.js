const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const configDb = require('./configDb/database.js');
const routes = require('./routes/routes.js');
const port = process.env.PORT || 8000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use('/', routes);


app.listen(port, () => {
    console.log('Server running on http://localhost:' + port);
});
