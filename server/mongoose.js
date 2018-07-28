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

  var snProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    imageUrl: {type: String},
    price: {type: Number},
    isWeight: {type: Boolean},
    weight:{type: Number},
    category: {type:Number}
  });


  snUserSchema.set('toJSON', {getters: true, virtuals: true});
  snFacebookUserSchema.set('toJSON', {getters: true, virtuals: true});
  snProductSchema.set('toJSON', {getters: true, virtuals: true});

  snProductSchema.statics.insertProduct = function(product, cb) {   
    var that = this;
    var newProduct = new that({
      name: product.name,
      imageUrl: product.url,
      price: product.price,
      isWeight: product.isWeight,
      weight: product.weight,
      category: product.category
    });
  
    newProduct.save(function(error, savedProduct) {
      if (error) {
        console.log(error);
      }
      return cb(error, savedProduct);
    });
  };

  snUserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    var newUser = new that({
      fullName: profile.displayName,
      email: profile.emails[0].value,
      Address:profile.Address,
      carts:[],
      isAdmin: 0
    });
  
    newUser.save(function(error, savedUser) {
      if (error) {
        console.log(error);
      }
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
        var newFacebookUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newFacebookUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          } else {
            usr.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
              return cb(err, user);
            });
          }
          return cb(error, savedUser);
        });
      } else {
        user.set({ 'facebookProvider.token': accessToken});
        user.save(function (err, updatedUser) {
          debugger;
          if (err) return handleError(err);
          return cb(err, updatedUser);
        });
        //user._doc.facebookProvider.token = accessToken;
        //user.save()
        /*usr.find({email:user._doc.email}, function(err, userData) {
          return cb(err, userData);
        });*/
      }
    });
  };

  mongoose.model('snUser', snUserSchema);
  mongoose.model('snFacebookUser', snFacebookUserSchema);
  mongoose.model('snProducts', snProductSchema);
  
  return db;
};