var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://luanpham:01667376890@cluster0-toeuz.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});


var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var singleproduct =require('./routes/singleproduct');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/category',categoryRouter);
app.use('/singleproduct',singleproduct);

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