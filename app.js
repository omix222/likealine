var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var groupmembers = require('./routes/groupmembers');
var messages = require('./routes/messages');
var stamps = require('./routes/stamps');
var usericons = require('./routes/usericons');

var MongoClient = require("mongodb").MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', index);

// httpmethod をapp.js側で指定するパターン
app.get('/messages', messages.find);
app.get('/messages/:id', messages.findById);
app.post('/messages', messages.create);
app.get('/users', users.find);
app.get('/users/:id', users.findById);
app.get('/groups', groups.find);
app.get('/groups/:id', groups.findById);
app.get('/stamps', stamps.find);
app.get('/stamps', stamps.findById);
app.get('/groupmembers', groupmembers.find);
app.get('/usericons', usericons.find);
app.get('/usericons', usericons.findById);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
