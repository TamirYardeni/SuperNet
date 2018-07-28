'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var mongoose = require('./mongoose'),
  passport = require('passport'),
  express = require('express'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  router = express.Router(),
  cors = require('cors'),
  bodyParser = require('body-parser');

mongoose();

var snFacebookUser = require('mongoose').model('snFacebookUser');
var snUser = require('mongoose').model('snUser');
var snProducts = require('mongoose').model('snProducts');

var passportConfig = require('./passport');

//setup configuration for facebook login
passportConfig();

var app = express();

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.route('/health-check').get(function(req, res) {
  res.status(200);
  res.send('Hello World');
});

var createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  next();
};

var sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

router.route('/auth/facebook')
  .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    next();
  }, generateToken, sendToken);

//token handling middleware
var authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

var getCurrentUser = function(req, res, next) {
  debugger;
  snFacebookUser.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      snUser.findOne({email:user.email}, function(err, userData) {
        if (err) {
          next(err);
        } else {
          req.user = userData;
          next();
        }
      });
    }
  });
  
};

var getOne = function (req, res) {
  var user = req.user.toObject();
  delete user['facebookProvider'];
  delete user['__v'];

  res.json(user);
};

var getUsers = function (req, res) {
  snUser.find({}, function(err, users) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not get users'] });
    } else {
      res.json(users);
    }
  });
};

var addProduct = function(req, res) {
  var product = req.body.product;
  snProducts.insertProduct(product, function(err, savedProduct) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not add products'] });
    } else {
      res.json(savedProduct);
    }
  });
};

router.route('/auth/me')
  .get(authenticate, getCurrentUser, getOne);

router.route('/users')
  .post(authenticate, getUsers);

router.route('/products')
  .post(authenticate, addProduct);


app.use('/api/v1', router);

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');