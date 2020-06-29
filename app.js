const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('views', __dirname + '/view');
app.set('view engine' , 'ejs');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const playerRouter = require('./router/PlayerRouter');
app.use(playerRouter);

module.exports = app;