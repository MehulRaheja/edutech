const { validationResult } = require('express-validator');

const Subject = require("../models/subject");

exports.getSubject = (req, res, next) => {
    let Data = [];
    Subject.find()
      .then((subjects) => {
        // console.log("received tests:" + tests[0]);
        Data = subjects.map((s) => {
          return { subjectId: s._id, subject: s.subject };
        });
        return Data;
      })
      .then((result) => {
        res.status(200).json({
          message: "Fetched Subjects Successfully.",
          subjects: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.postSubject = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const sub = req.body.subject;
    const subData = new Subject({
      subject: sub,
    });
    subData
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Subject added successfully",
          subjectData: subData,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.deleteSubject = (req, res, next) => {
    const subId = req.params.subjectId;
    Subject.findById(subId)
      .then((sub) => {
        if (!sub) {
          const error = new Error("No Subject found");
          error.statusCode = 404;
          throw error;
        }
        return Subject.findByIdAndRemove(subId);
      })
      .then((result) => {
        res.status(200).json({
          message: "Subject Deleted",
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.updateSubject = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const subId = req.params.subjectId;
    const subData = req.body.subject;
    Subject.findById(subId)
      .then((sub) => {
        if (!sub) {
          const error = new Error("No school found");
          error.statusCode = 404;
          throw error;
        }
        sub.subject = subData;
        sub.save();
      })
      .then((result) => {
        res.status(200).json({ message: "Subject is updated", subject: result });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  