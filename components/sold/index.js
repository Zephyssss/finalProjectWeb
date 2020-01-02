var express = require('express');
var router = express.Router();
const soldController = require('./soldController');

router.post('/checkout',soldController.createCheckout)

router.get('/checkout', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('checkout', { title: 'Check out', errors });
});

module.exports = router;