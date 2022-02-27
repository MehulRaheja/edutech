const express = require("express");
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const schoolController = require("../controllers/school");

router.get("/", schoolController.getSchool);

router.post(
    "/post", 
    isAuth, 
    [
        body('school')
            .trim()
            .isLength({ min: 3 }),
    ],
    schoolController.postSchool);

router.delete("/delete/:schoolId", isAuth, schoolController.deleteSchool);

router.put(
    "/update/:schoolId", 
    isAuth, 
    [
        body('school')
            .trim()
            .isLength({ min: 3 }),
    ],
    schoolController.updateSchool);

module.exports = router;