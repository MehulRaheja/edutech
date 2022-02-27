const express = require("express");
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const subjectController = require("../controllers/subject");

router.get("/", subjectController.getSubject);

router.post(
    "/post", 
    isAuth, 
    [
        body('subject')
            .trim()
            .isLength({ min: 3 }),
    ],
    subjectController.postSubject);

router.delete("/delete/:subjectId", isAuth, subjectController.deleteSubject);

router.put(
    "/update/:subjectId", 
    isAuth, 
    [
        body('subject')
            .trim()
            .isLength({ min: 3 }),
    ],
    subjectController.updateSubject);

module.exports = router;