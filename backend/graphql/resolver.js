const validator = require('validator');
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

module.exports = {
    getUser: async function(args, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        const user = await User.findById(req.userIdGraph);
        if (!user) {
            const error = new Error('No user found!');
            error.code = 404;
            throw error;
        }
        const results = user.result.tests.map(test => {
            return {
                testId: test.testId.toString(),
                subject: test.subject,
                answers: test.answers,
                marks: test.marks,
                _id: test._id.toString()
            };
        });
        return {
            _id: user._id.toString(),
            email: user.email,
            password: user.password,
            type: user.type,
            name: user.name,
            school: user.school,
            imageUrl: user.imageUrl,
            std: user.class,
            tests: [...results]
        };
    },

    login: async function({email, password}, req) {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            process.env.TOKEN_KEY,
            { expiresIn: '30d' }
        );
        return { 
            token: token, 
            userId: user._id.toString(), 
            userName: user.name 
        };
    },

    signup: async function({userInput}, req) {
        // console.log('signing up');
        const errors = [];
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'E-Mail is invalid.' });
        }
        if (
            validator.isEmpty(userInput.password) ||
            !validator.isLength(userInput.password, { min: 5 })
        ) {
            errors.push({ message: 'Password too short!' });
        }
        if (validator.isEmpty(userInput.name)) {
            errors.push({ message: 'Name too short!' });
        }
        if (validator.isEmpty(userInput.school)) {
            errors.push({ message: ' Enter School' });
        }
        if (validator.isEmpty(userInput.type)) {
            errors.push({ message: ' Enter Type' });
        }
        if (validator.isEmpty(userInput.std)) {
            errors.push({ message: ' Enter Class' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password, 12);
        console.log(hashedPw);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw,
            type: userInput.type,
            school: userInput.school,
            class: userInput.std,
            imageUrl: userInput.imageUrl
        });
        const createdUser = await user.save();
        transporter.sendMail({
            to: userInput.email,
            from: process.env.SENDER_MAIL,
            subject: 'Edutech Signup Succeeded!',
            html: '<h1>You successfully signed up!</h1>'
        });
        return { 
            message: 'User added Successfully', 
            name: createdUser.name, 
            email: createdUser.email, 
            userId: createdUser._id.toString(),
            imageUrl: createdUser.imageUrl
        };
    },

    update: async function({userInput}, req) {
        const errors = [];
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'E-Mail is invalid.' });
        }
        if (validator.isEmpty(userInput.name)) {
            errors.push({ message: 'Name too short!' });
        }
        if (validator.isEmpty(userInput.school)) {
            errors.push({ message: ' Enter School' });
        }
        if (validator.isEmpty(userInput.type)) {
            errors.push({ message: ' Enter Type' });
        }
        if (validator.isEmpty(userInput.std)) {
            errors.push({ message: ' Enter Class' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: userInput.email });
        if (!existingUser) {
            const error = new Error('User does not exists!');
            throw error;
        }
        existingUser.email = userInput.email,
        existingUser.name = userInput.name,
        existingUser.school = userInput.school,
        existingUser.type = userInput.type,
        existingUser.class = userInput.std
        const updatedUser = await existingUser.save();
        return {
            message: 'User updated Successfully', 
            name: updatedUser.name, 
            email: updatedUser.email, 
            _id: updatedUser._id.toString()
        }
    },

    submitTest: async function({testSubmit}, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        const testId = testSubmit.testId;
        const subject = testSubmit.subject;
        const answers = testSubmit.answers;
        let marks = 0;
        const test = await Test.findById(testId);
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
        const today = new Date();
        const user = await User.findById(req.userIdGraph);
        const exam = {
            testId: testId,
            subject: subject,
            answers: answers,
            marks: marks,
            date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() 
        }
        user.result.tests.push(exam);
        await user.save();
        return {
            message: 'Test submitted Successfully', 
            marks: marks
        }
    },
}
