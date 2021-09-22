const express = require('express');
const ProductController = require('../controller/product');
const passport = require('passport');

const router = express.Router();
const authJwt = passport.authenticate('jwt', { session: false });

router.route('/export').post(ProductController.exportProduct);
router
  .route('/')
  .get(ProductController.index)
  .post(authJwt, ProductController.create);

router
  .route('/:id')
  .get(ProductController.getById)
  .put(authJwt, ProductController.update)
  .delete(authJwt, ProductController.delete);

module.exports = router;
