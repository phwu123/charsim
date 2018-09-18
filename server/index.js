const morgan = require('morgan');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
//require('../db/config.js');

const app = express();
app.use(morgan('dev'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(express.static(path.join(__dirname, '../static')));

const port = 3000;

app.listen(port, () => {
  console.log('server listening on port ', port);
})