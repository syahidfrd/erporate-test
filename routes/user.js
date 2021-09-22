const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const passport = require('passport');

const authJwt = passport.authenticate('jwt', { session: false });
router.route('/:id').get(authJwt, UserController.getById);

module.exports = router;
