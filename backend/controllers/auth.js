const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');
const Test = require('../models/test');

dotenv.config();

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.NODE_MAILER_KEY
    }
}))


exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    // if (!req.body) {
    //     const error = new Error("No data provided.");
    //     error.statusCode = 422;
    //     throw error;
    // }
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const name = req.body.name;
    const school = req.body.school;
    const std = req.body.std;
    User.findOne({ email: email })
        .then(foundUser => {
            if(foundUser){
                const error = new Error("User with this email already exists.");
                error.statusCode = 422;
                throw error;
            }
        });
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                type: type,
                name: name,
                school: school,
                class: std
            });
            return user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: "User added successfully",
                name: result.name,
                email: result.email,
                userId: result._id
            });
            return transporter.sendMail({
                to: email,
                from: process.env.SENDER_MAIL,
                subject: 'Signup Succeeded!',
                html: '<h1>You successfully signed up!</h1>'
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    // if (!req.body) {
    //     const error = new Error("No data provided.");
    //     error.statusCode = 422;
    //     throw error;
    // }
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error("A user with this email could not be found.");
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                process.env.TOKEN_KEY,
                { expiresIn: '72h' }
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString(), userName: loadedUser.name });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.update = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    // if (!req.body) {
    //     const error = new Error("No data provided.");
    //     error.statusCode = 422;
    //     throw error;
    // }
    const email = req.body.email;
    const userId = req.body.userId;
    const password = req.body.password;
    const type = req.body.type;
    const name = req.body.name;
    const school = req.body.school;
    const std = req.body.std;

    User.findById(userId)
        .then(user => {
            // if(bcrypt.compare(password, user.password)){
            //     const error = new Error("Wrong password.");
            //     error.statusCode = 422;
            //     throw error;
            // }
            user.email = email,
            user.type = type,
            user.name = name,
            user.school = school,
            user.class = std 
            return user.save();
        })
        .then(result => {
            res.status(201).json({ 
                userId: result._id.toString(), 
                email: result.email, 
                type: result.type, 
                name: result.name, 
                school: result.school, 
                std: result.class 
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.submitTest = (req, res, next) => {
    if (!req.body) {
        const error = new Error("No data provided.");
        error.statusCode = 422;
        throw error;
    }
    const testId = req.body.testId;
    const subject = req.body.subject;
    const answers = req.body.answers;
    // console.log(req.userId, testId, answers);
    // console.log(answers);
    let marks = 0;
    let exam;
    Test.findById(testId)
        .then(test => {
            if(!test) {
                const error = new Error("Test not found.");
                error.statusCode = 404;
                throw error;
            }
            console.log(test, answers);
            if(test.questions.que1.ans == answers[0]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            // console.log(test.questions.que2.ans, answers[1]);
            if(test.questions.que2.ans == answers[1]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            // console.log(test.questions.que3.ans, answers[2]);
            if(test.questions.que3.ans == answers[2]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            // console.log(test.questions.que4.ans, answers[3]);
            if(test.questions.que4.ans == answers[3]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            // console.log(test.questions.que5.ans, answers[4]);
            if(test.questions.que5.ans == answers[4]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            // console.log(test.questions.que6.ans, answers[5]);
            if(test.questions.que6.ans == answers[5]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            if(test.questions.que7.ans == answers[6]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            if(test.questions.que8.ans == answers[7]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            if(test.questions.que9.ans == answers[8]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            if(test.questions.que10.ans == answers[9]) {
                marks = marks + 4;
            } else {
                marks = marks - 1;
            }
            console.log('marks', marks);
            return test;
        })
        .then(test => {
            User.findById(req.userId)
                .then(user => {
                    exam = {
                        testId: testId,
                        subject: subject,
                        answers: answers,
                        marks: marks
                    }
                    user.result.tests.push(exam);
                    return user.save();
                })
        })
        .then(result => {
            res.status(201).json({
                message: 'Test submitted Successfully',
                marks: marks,
                // name: result.name
            })
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });        
};

exports.getResult = (req, res, next) => {
    let userId = req.userId;
    let name;
    let std;
    let school;
    let result;
    User.findById(userId)
        .then(user => {
            name = user.name;
            std = user.class;
            school = user.school;
            result = user.result;
            return result;
        })
        .then( result => {
            res.status(200).json({
                name: name,
                std: std,
                school: school,
                result: result
            });
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

// for logout