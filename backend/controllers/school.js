const { validationResult } = require('express-validator');

const io = require('../socket');
const School = require("../models/school");

exports.getSchool = (req, res, next) => {
    let schoolData = [];
    School.find()
      .then((schools) => {
        // console.log("received tests:" + tests[0]);
        schoolData = schools.map((s) => {
          return { schoolId: s._id, school: s.school };
        });
        return schoolData;
      })
      .then((result) => {
        res.status(200).json({
          message: "Fetched Schools Successfully.",
          schools: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  exports.postSchool = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const school = req.body.school;
    const schoolData = new School({
      school: school,
    });
    try {
      await schoolData.save();
      // const schools = await School.find();
      io.getIO().emit('schools', { action: 'create', school: schoolData });
      res.status(201).json({
        message: "School added successfully",
        schoolData: schoolData,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  // exports.postSchool = (req, res, next) => {
  //   const errors = validationResult(req);
  //   if(!errors.isEmpty()) {
  //       const error = new Error('Validation failed.');
  //       error.statusCode = 422;
  //       throw error;
  //   }
  //   // if (!req.body) {
  //   //   const error = new Error("No data provided.");
  //   //   error.statusCode = 422;
  //   //   throw error;
  //   // }
  //   const school = req.body.school;
  //   const schoolData = new School({
  //     school: school,
  //   });
  //   schoolData
  //     .save()
  //     .then((result) => {
  //       res.status(201).json({
  //         message: "School added successfully",
  //         schoolData: schoolData,
  //       });
  //     })
  //     .catch((err) => {
  //       if (!err.statusCode) {
  //         err.statusCode = 500;
  //       }
  //       next(err);
  //     });
  // };

  exports.deleteSchool = async (req, res, next) => {
    const schoolId = req.params.schoolId;
    try {
      const school = await School.findById(schoolId);
      if (!school) {
        const error = new Error("No School found");
        error.statusCode = 404;
        throw error;
      }
      await School.findByIdAndRemove(schoolId);
      io.getIO().emit('schools', { action: 'delete', school: schoolId});
      res.status(200).json({
        message: "School Deleted",
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  // exports.deleteSchool = (req, res, next) => {
  //   const schoolId = req.params.schoolId;
  //   School.findById(schoolId)
  //     .then((school) => {
  //       if (!school) {
  //         const error = new Error("No School found");
  //         error.statusCode = 404;
  //         throw error;
  //       }
  //       return School.findByIdAndRemove(schoolId);
  //     })
  //     .then((result) => {
  //       res.status(200).json({
  //         message: "School Deleted",
  //       });
  //     })
  //     .catch((err) => {
  //       if (!err.statusCode) {
  //         err.statusCode = 500;
  //       }
  //       next(err);
  //     });
  // };
 
  
  exports.updateSchool = async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    
    const schoolData = req.body.school;
    try {
      const school = await School.findById(schoolId);
      if(!school) {
        const error = new Error("No school found");
        error.statusCode = 404;
        throw error;
      }
      school.school = schoolData;
      const result = await school.save();
      io.getIO().emit('schools', { action: 'update', school: result });
      res.status(200).json({ message: "School is updated", school: result });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  // exports.updateSchool = (req, res, next) => {
  //   const errors = validationResult(req);
  //   if(!errors.isEmpty()) {
  //       const error = new Error('Validation failed.');
  //       error.statusCode = 422;
  //       throw error;
  //   }
  //   const schoolId = req.params.schoolId;
  //   const schoolData = req.body.school;
  //   School.findById(schoolId)
  //     .then((school) => {
  //       if (!school) {
  //         const error = new Error("No school found");
  //         error.statusCode = 404;
  //         throw error;
  //       }
  //       school.school = schoolData;
  //       school.save();
  //     })
  //     .then((result) => {
  //       res.status(200).json({ message: "School is updated", school: result });
  //     })
  //     .catch((err) => {
  //       if (!err.statusCode) {
  //         err.statusCode = 500;
  //       }
  //       next(err);
  //     });
  // };
  