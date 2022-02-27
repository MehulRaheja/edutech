const { validationResult } = require('express-validator');

const Test = require("../models/test");

exports.getTests = (req, res, next) => {
  let testData = [];
  Test.find()
    .then((tests) => {
      // console.log("received tests:" + tests[0]);
      testData = tests.map((t) => {
        return { testId: t._id, title: t.title };
      });
      return testData;
    })
    .then((result) => {
      res.status(200).json({
        message: "Fetched Tests data Successfully.",
        tests: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.freeTest = (req, res, next) => {
  // const auth = req.body.auth;
  const std = req.body.std;
  const subject = req.body.subject;
  Test.findOne({authenticated: false, class: std, subject: subject})
    .then((testData) => {
      res.status(200).json({
        message: "Fetched Test data Successfully.",
        test: testData,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTest = (req, res, next) => {
  const testId = req.params.testId;
  Test.findById(testId)
    .then((test) => {
      if (!test) {
        const error = new Error("Test not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Fetched Test data Successfully.",
        test: test,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postTest = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      throw error;
  }
  const title = req.body.title;
  const school = req.body.school;
  const std = req.body.class;
  const subject = req.body.subject;
  const topic = req.body.topic;
  const difficulty = req.body.difficulty;
  const userId = req.body.userId;
  const questions = req.body.questions;
  let authenticated = true;
  if(req.body.authenticated === 'no'){
    authenticated = false;
  }
  if(req.body.authenticated === 'yes'){
    authenticated = true;
  }
  
  const test = new Test({
    title: title,
    school: school,
    class: std,
    subject: subject,
    topic: topic,
    authenticated: authenticated,
    difficulty: difficulty,
    userId: req.userId,
    questions: questions,
  });
  test
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Test added successfully",
        test: test,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteTest = (req, res, next) => {
  const testId = req.params.testId;
  Test.findById(testId)
    .then((test) => {
      if (!test) {
        const error = new Error("Test not found");
        error.statusCode = 404;
        throw error;
      }
      return Test.findByIdAndRemove(testId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Test Deleted",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTest = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      throw error;
  }
  const testId = req.params.testId;
  const title = req.body.title;
  const questions = req.body.questions;
  Test.findById(testId)
    .then((test) => {
      if (!test) {
        const error = new Error("No test found");
        error.statusCode = 404;
        throw error;
      }
      test.title = title;
      test.questions = questions;
      test.save();
    })
    .then((result) => {
      res.status(200).json({ message: "test is updated", test: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
