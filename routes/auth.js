const express = require('express');
const UserController = require('../controller/auth');
const router = express.Router();

router.route('/signup').post(UserController.signup);
router.route('/login').post(UserController.login);

module.exports = router;
