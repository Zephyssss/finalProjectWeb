var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tracking', function(req, res, next) {
  res.render('tracking', { title: 'Tracking' });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});

router.get('/confirm', function(req, res, next) {
  res.render('confirm', { title: 'Comfirm' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Login success' });
});

router.get('/forgetpw', function(req, res, next) {
  res.render('forgetpw', { title: 'Forget Password' });
});

router.get('/trackoutput', function(req, res, next) {
  res.render('trackoutput', { title: 'Tracking' });
});
module.exports = router;
