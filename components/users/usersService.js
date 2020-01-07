const bcrypt = require('bcryptjs');
const UserModel = require('../../model/users');
const VerifyModel = require('../../model/verifyid');
var nodemailer = require("nodemailer");


module.exports.createUser = (res, name, username, password) => {
    let errors = [];
    if (!name || !username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', { errors });
    } else {

        UserModel.findOne({ username: username }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors });
            } else {
                let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                const newUser = new UserModel({ name, username, password: hash, active: false });

                return newUser.save();
            }
        });

    }
};

module.exports.updateUserInfo = async (res, id, newinfo) => {
    const result = await UserModel.updateOne({ '_id': id }, { $set: { 'name': newinfo.name, 'sex': newinfo.sex, 'address': newinfo.address, 'phone_number': newinfo.phone } }, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    return result.save();
};

module.exports.sendverification = (req, res, next, content) => {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "lannguyenhcm13101999@gmail.com",
            pass: "01667376890aa"
        }
    });
    var mailOptions;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your Email account",
        html: content
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
}

module.exports.verifyservice = async (req, res, next) => {

    let rand;

    await VerifyModel.findOne({ userid: req.query.userid }).then(value => {
        if (value) {
            rand = value.id;
            console.log(value);
        }
    });

    console.log(req.protocol + "://" + req.get('host'));
    if (req.query.id == rand) {
        console.log("email is verified");
        UserModel.updateOne({ '_id': req.query.userid }, { $set: { 'active': true } }, (err, doc) => {
            if (err) {
                console.log("update document error");
            } else {
                console.log("update document success");
            }
        });
        this.deleteverifycode(req.query.userid);
        res.end("<h1> Successfully verified</h1>");
    }
    else {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}

module.exports.checkcode = async (codecheck, username) => {

    let code;
    await VerifyModel.findOne({ userid: username }).then(value => {
        if (value) {
            code = value.code;
            console.log(value);
        }
    });
    if (code == codecheck) {
        await this.deleteverifycode(username);
        return true;
    }
    return false;
}
module.exports.changeuserpw = async (username, password) => {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    UserModel.updateOne({ 'username': username }, { $set: { 'password': hash } }, (err, doc) => {
        if (err) {
            console.log("update password error");
        } else {
            console.log("update password success");
        }
    });
}


module.exports.savevverifycode = (userid, randnum, code) => {
    const newid = new VerifyModel({ userid: userid, id: randnum, code: code });
    newid.save();
}
module.exports.deleteverifycode = async (useridq) => {

    await VerifyModel.findOneAndDelete({ userid: useridq });
    console.log("delete verify code success");
}

module.exports.checkPassWord = async (username, password, next) => {

    let user;
    try {
        user = await UserModel.findOne({ username: username });

    } catch (error) {
        next(error);

    }
    if (user) {
        let result
        try {
        result= await bcrypt.compare(password, user.password);
            
        } catch (error) {
            next(error)
            
        }
        return result;

    }
    else {
        return false;
    }
}