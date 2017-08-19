var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./apps/web/routes');
var todos = require('./apps/todos/routes');

var mongoose = require('mongoose');

var app = express();

// Connect to database
if (process.env.NODE_ENV == 'test') {
  mongoose.connect('mongodb://localhost/db');
} else if (process.env.NODE_ENV == 'development') {
  mongoose.connect('mongodb://localhost/db');
} else if (process.env.NODE_ENV == 'production') {
  // connect to production database
}

// Engines options.
var engines = {
    jade: 'jade',
    jsx: 'jsx',
    hbs: 'hbs'
}

// view engine setup
app.set('views', path.join(__dirname, 'views/' + engines.hbs));
app.set('view engine', engines.hbs);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
