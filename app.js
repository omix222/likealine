var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var messeges = require('./routes/messeges');
var stamps = require('./routes/stamps');

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

//mongo initialize
// 接続文字列
var url = "mongodb://localhost:27017/likealine";
 
// MongoDB へ 接続
MongoClient.connect(url, (error, db) => {
    // 接続メッセージを表示
    console.log("MongoDB へ 接続中...");
 
    // MongoDB への 接続 を 切断
    db.close();
});

// routing
// httpmethod をrouts側で指定するパターン
app.use('/', index);
app.use('/users', users);
app.use('/stamps', stamps);
// httpmethod をapp.js側で指定するパターン
app.get('/messeges', messeges.find);
app.get('/messeges/:id', messeges.findById);



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
