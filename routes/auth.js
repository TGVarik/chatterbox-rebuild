/**
 * Created by tom on 10/4/14.
 */
module.exports = function () {
  var express = require('express');
  var passport = require('passport');
  var _ = require('underscore');
  var config = require('./config');

  var auths = _.map(config, function (item) {
    return item;
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  var router = express.Router();

  var authRedirect = {failureRedirect: '/auth', successRedirect: '/chat'};
  var authSuccess = function(token, tokenSecret, profile, done){
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    process.nextTick(function(){
      return done(null, profile);
    });
  };

  router.get('/', function (req, res) {
    res.render('login', { auths: auths });
  });

  for (var a in auths){
    passport.use(new (require('passport-' + auths[a].service).Strategy)(auths[a].strategy, authSuccess));
    router.get('/' + auths[a].service, passport.authenticate(auths[a].service, auths[a].options));
    router.get('/' + auths[a].service + '/callback', passport.authenticate(auths[a].service, authRedirect));
  }

  return router;
}();