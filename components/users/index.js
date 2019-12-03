var express = require('express');
var router = express.Router();

const passport = require('../../passport');
const userController = require('./usersController');

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', userController.loginUser);

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', userController.createUser);

module.exports = router;