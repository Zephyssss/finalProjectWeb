const UserService = require('./usersService');
const passport = require('passport');
require('../../passport')(passport);

module.exports.loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    } catch (e) {
        next(e);
    }
}
module.exports.emailverify =(req,res,next)=>{
    
    res.render('verify',{title: "xác thực email"});
}
module.exports.verify =async (req,res,next) =>{
    try {
        console.log("verifing .....")
    await UserService.verifyservice(req,res,next);
        
    } catch (error) {
        
    }
    // res.render('verifysuccess',{title:"Xác thực email",layout:false});
}

module.exports.sendemailverify= async(req,res,next) =>{
    let randnum, link,content;
    randnum = Math.floor((Math.random() * 10000) + 54);
    await UserService.savevverifycode(res.locals.user._id,randnum,0);
    link = "http://" + req.get('host') + "/user/emailverify/verify?id=" + randnum + "&userid=" + res.locals.user._id;
    content="Hello this is winter123 mail system,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>";
    try {
        await UserService.sendverification(req,res,next,content);
    } catch (error) {
        
    }
}

module.exports.createUser = async (req, res, next) => {
    try{
        await UserService.createUser(res,req.body.name,req.body.username,req.body.password);
    }catch(e){
        next(e);
    }
    res.redirect('/');
};

module.exports.updateUserInfo = async (req, res, next) => {
    const newinfo = {'name': req.body.name, 'sex': req.body.sex,'address': req.body.address,'phone': req.body.phone};
    try {
        await UserService.updateUserInfo(res,req.query.id,newinfo);
    } catch (e) {
        next(e);
    }
    res.redirect('back');
};


module.exports.forgetpass= (req,res,next) =>{
    res.render('forgetpw',{title:"Quên mật khẩu"});
}


module.exports.forgotpasspost=async(req,res,next) =>{
   const result= await UserService.checkcode(req.body.code,req.body.username);
   if(result){
       await UserService.changeuserpw(req.body.username,req.body.password);
       console.log("Cap nhat thanh cong");
       res.redirect('/user/login');

   }
       console.log("sai ma xac thuc");
       res.redirect('back');
}
module.exports.sendforgetpwcode= async (req,res,next) =>{
    let randnum,content;
    randnum = Math.floor((Math.random() * 10000) + 54);
    await UserService.savevverifycode(req.query.to,0,randnum);
    content= "Hello,this is winter123 mail system<br>This is your forget password code:  "+randnum;
    try {
        await UserService.sendverification(req,res,next,content);
    } catch (error) {
        console.log(" send forget pass error")
    }

}

module.exports.getChangePW=  (req,res,next)=>{
    res.render('changepw',{title:"Thay đổi mật khẩu"});
}

module.exports.postChangePW=async (req,res,next) =>{
   const istrue= await UserService.checkPassWord(req.body.username,req.body.password,next);
   console.log("istrue"+ istrue)
   if(istrue){
      await UserService.changeuserpw(req.body.username,req.body.newpassword);
       res.redirect('/');

   }
   res.redirect('back');

}