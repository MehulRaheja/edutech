const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", feedController.getTests);

router.post("/freetest", feedController.freeTest);

router.get("/post/:testId", isAuth, feedController.getTest);

router.post(
    "/post", 
    isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 3 }),
        // body('subject')
        //     .trim()
        //     .isLength({ min: 3 }),
    ],
    feedController.postTest);

router.delete("/delete/:testId", isAuth, feedController.deleteTest);

router.put(
    "/update/:testId", 
    isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 3 }),
        body('questions')
            .trim()
            .isLength({ min: 3 }),
    ],
    feedController.updateTest);

module.exports = router;
