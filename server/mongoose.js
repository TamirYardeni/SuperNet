'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = function () {

  var db = mongoose.connect('mongodb://admin:1234@ds239117.mlab.com:39117/colman');

  var snUserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    },
    Address:{type: String},
    carts:{type: Array},
    isAdmin: {type: Boolean}
  });

  var snFacebookUserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });


  snUserSchema.set('toJSON', {getters: true, virtuals: true});
  snFacebookUserSchema.set('toJSON', {getters: true, virtuals: true});

  snUserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    debugger;
    var newUser = new that({
      fullName: profile.displayName,
      email: profile.emails[0].value,
      Address:profile.Address,
      carts:[],
      isAdmin: 0
    });
    debugger
    newUser.save(function(error, savedUser) {
      if (error) {
        console.log(error);
        debugger
      }
      debugger;
      return cb(error, savedUser);

    });
  };

  snFacebookUserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var usr = mongoose.model('snUsers', snUserSchema);
    var that = this;
    return this.findOne({
      'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        debugger;
        var newFacebookUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newFacebookUser.save(function(error, savedUser) {
          debugger;
          if (error) {
            console.log(error);
          } else {
            usr.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
              debugger;
              return cb(err, user);
            });
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };

  mongoose.model('snUser', snUserSchema);
  mongoose.model('snFacebookUser', snFacebookUserSchema);
  
  return db;
};