const UserService = require('./usersService');

module.exports.createUser = async (req, res, next) => {
    try{
        await UserService.createUser(req.body.name,req.body.username,req.body.password);
        res.redirect('/');
    }catch(e){
        next(e);
    }
    
};