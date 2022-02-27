const { validationResult } = require('express-validator');

const Standard = require("../models/standard");

exports.getStd = (req, res, next) => {
    let stdData = [];
    Standard.find()
      .then((stds) => {
        // console.log("received tests:" + tests[0]);
        stdData = stds.map((s) => {
          return { stdId: s._id, std: s.std };
        });
        return stdData;
      })
      .then((result) => {
        res.status(200).json({
          message: "Fetched Classes Successfully.",
          stds: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.postStd = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const std = req.body.std;
    const stdData = new Standard({
      std: std,
    });
    stdData
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Standard added successfully",
          stdData: stdData,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.deleteStd = (req, res, next) => {
    const stdId = req.params.stdId;
    Standard.findById(stdId)
      .then((std) => {
        if (!std) {
          const error = new Error("No class found");
          error.statusCode = 404;
          throw error;
        }
        return Standard.findByIdAndRemove(stdId);
      })
      .then((result) => {
        res.status(200).json({
          message: "Class Deleted",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.updateStd = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const stdId = req.params.stdId;
    const standard = req.body.std;
    Standard.findById(stdId)
      .then((std) => {
        if (!std) {
          const error = new Error("No test found");
          error.statusCode = 404;
          throw error;
        }
        std.std = standard;
        std.save();
      })
      .then((result) => {
        res.status(200).json({ message: "Class is updated", std: result });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  