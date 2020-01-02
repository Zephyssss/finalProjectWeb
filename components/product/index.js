var express = require('express');
var router = express.Router();
const productController = require('./productController');


router.get('/category', productController.Category);

router.get('/singleproduct', productController.singlePro);

router.post('/singleproduct', productController.postComment);

router.post('/cart',productController.cart);

module.exports = router;