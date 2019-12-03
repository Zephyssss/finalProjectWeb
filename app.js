var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
require('./passport');
const session = require('express-session');

mongoose.connect(process.env.URI, {useNewUrlParser: true});

//require('./passport/index')(passport);

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var singleproduct =require('./routes/singleproduct');
const registerRouter = require('./components/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/category',categoryRouter);
app.use('/singleproduct',singleproduct);
app.use('/',registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
