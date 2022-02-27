const { validationResult } = require('express-validator');

const User = require('../models/user');
const Test = require('../models/test');

exports.getProfile = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      // console.log(user);
        return { user };
      })
    .then((result) => {
      res.status(200).json({
        message: "Fetched User Profile Successfully.",
        name: result.user.name,
        email: result.user.email,
        school: result.user.school,
        class: result.user.class
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  };

exports.getUserdata = (req, res, next) => {
  // let testData;
  User.findById(req.userId)
    .then((user) => {
      const std = user.class;
      // console.log(std);
      Test.find({class: std})
        .then(tests => {
          res.status(200).json({
            message: "Fetched User data Successfully.",
            tests: tests
          });
        })  
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
