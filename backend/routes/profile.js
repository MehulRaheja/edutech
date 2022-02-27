const express = require("express");
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get("/profile/", isAuth, profileController.getProfile);

router.get("/userdata/", isAuth, profileController.getUserdata);

module.exports = router;