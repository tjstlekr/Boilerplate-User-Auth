"use strict"
// importing dependencies
require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jsORM = require('js-hibernate');
const dbconfig = require('./config/config');
const session = jsORM.session(dbconfig);

// server port
const port = process.env.SERVER_PORT || 3000

// route files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/api/v1', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // console.log(req);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// starting server
app.listen(port, function () {
 console.log(`Server started at ${port}`);
});

module.exports = app;
