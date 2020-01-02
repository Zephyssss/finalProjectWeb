const soldService = require('./soldService');
//const sold = require('../../model/sold');

module.exports.createCheckout = async (req, res, next) => {
    try {
         await soldService.createCheckout(res,req.body.cartsession1,req.body.name,req.body.number,req.body.compemailany,req.body.add1,req.body.add2,req.body.zip,req.body.userID);

    } catch (error) {
        next(error);
    }
    res.redirect('/');
}