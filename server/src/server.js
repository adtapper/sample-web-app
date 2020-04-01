const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080'
  }));
app.use('/', routes);

module.exports = app;