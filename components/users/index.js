var express = require('express');
var router = express.Router();

const passport = require('../../passport');
const userController = require('./usersController');

router.get('/login', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('login', { title: 'Login', errors });
});

router.post('/login', userController.loginUser);

router.get('/register', function (req, res, next) {
    const errors = req.flash().error || [];
    res.render('register', { title: 'Register', errors });
});

router.post('/register', userController.createUser);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/info', (req, res, next) => {
    if(res.locals.isLoggedIn)
    {
    res.render('user_info', { title: 'Thông tin cá nhân' });
    }
    else{
        res.render('error');
    }
});

router.get('/emailverify/send',userController.sendemail);

router.get('/emailverify',userController.emailverify);

router.get('/emailverify/verify',userController.verify);

router.post('/info', userController.updateUserInfo);

module.exports = router;