'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  snFacebookUser = require('mongoose').model('snFacebookUser');

module.exports = function () {
  try {
    passport.use(new FacebookTokenStrategy({
        clientID: '224136171639903',
        clientSecret: 'b1d949f30184875ea1fe41512a292f24'
      },
      function (accessToken, refreshToken, profile, done) {
        // Get the facebookUser according to his mail
        // If the facebookUser doent exist create new user
        // If the facebookUser exist update it without inserting user
        snFacebookUser.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
          return done(err, user);
        });
      }));
    } catch (err) {
    }
};