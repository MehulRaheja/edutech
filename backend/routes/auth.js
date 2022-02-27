const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//'/user/...'
router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if(userDoc){
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5, max: 10 }),
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('type')
            .trim()
            .not()
            .isEmpty(),
        body('school')
            .trim()
            .not()
            .isEmpty(),
        body('std')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup);

router.post('/login', authController.login);

router.put(
    '/update', 
    isAuth,
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('type')
            .trim()
            .not()
            .isEmpty(),
        body('school')
            .trim()
            .not()
            .isEmpty(),
        body('std')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.update);

router.post('/submit-test', isAuth, authController.submitTest);

router.get('/result', isAuth, authController.getResult);

module.exports = router;