var createError   = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

const localSignupStrategy = require('./passport/signup_passport');
const loginStrategy = require('./passport/login_passport');
var app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());

app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use('/', indexRouter);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('404 Not Found');
});

module.exports = app;
