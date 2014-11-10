var config = require('./routes/config.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
var passport = require('passport');
var session = require('express-session');
var auth = require('./routes/auth');
var db = require('./db');
var app = express();

var compile = function(str, path){
  return stylus(str)
      .set('filename', path)
      .set('compile', true)
      .use(nib())
      .import('nib');
};



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware({src: path.join(__dirname, 'public'), compile: compile}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js/jquery', express.static(__dirname + '/bower_components/jquery/dist'));
app.use('/js/jquery.terminal', express.static(__dirname + '/bower_components/jquery.terminal/js'));
app.use('/css/jquery.terminal', express.static(__dirname + '/bower_components/jquery.terminal/css'));
app.use('js/ascii-table', express.static(__dirname + '/bower_components/ascii-table'));

app.use(session({secret: "like flaming loaves"}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);

app.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/chat')
  } else {
    res.redirect('/auth')
  }
});

app.get('/chat', function(req, res){
  if (req.user) {
    res.render('chat', {user: req.user});
  } else {
    res.redirect('/auth')
  }
});

app.get('/rooms', function(req, res){
  if (req.user){
    res.json(db.activeUsers());
  }
});

 // var root = app.get('env') === 'production' ? config.appRoot : "http://localhost:3000";

// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));










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
