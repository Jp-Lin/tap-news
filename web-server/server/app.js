var createError   = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

app.use('/', indexRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('404 Not Found');
});

module.exports = app;
