const express = require('express');
const TransactionController = require('../controller/transaction');
const passport = require('passport');

const router = express.Router();
const authJwt = passport.authenticate('jwt', { session: false });

router
  .route('/')
  .post(authJwt, TransactionController.create)
  .get(authJwt, TransactionController.getAll);

module.exports = router;
