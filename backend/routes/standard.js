const express = require("express");
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

const stdController = require("../controllers/standard");

router.get("/", stdController.getStd);

router.post(
    "/post", 
    isAuth, 
    [
        body('std')
            .trim()
            .isLength({ min: 3 }),
    ],
    stdController.postStd);

router.delete("/delete/:stdId", isAuth, stdController.deleteStd);

router.put(
    "/update/:stdId", 
    isAuth, 
    [
        body('std')
            .trim()
            .isLength({ min: 3 }),
    ],
    stdController.updateStd);

module.exports = router;
