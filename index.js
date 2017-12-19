const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database.js');
const bodyParser = require('body-parser');
const path = require('path');
const authentication = require('./routes/authentication')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Cannot connect to database', err);
    } else {
        console.log('Connect to database: ' + config.db);
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authentication);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.html'));
});


app.listen(8080, (req, res) => {
    console.log('Listening');
});