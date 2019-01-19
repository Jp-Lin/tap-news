const createError   = require('http-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const config = require('./config/config.json');
require('./models/main').connect(config.mongoDbUri);
const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const localSignupStrategy = require('./passport/signup_passport');
const localLoginStrategy = require('./passport/login_passport');

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use('/', indexRouter);
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);
app.use('/news', newsRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send('404 Not Found');
});

module.exports = app;
