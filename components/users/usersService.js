const bcrypt = require('bcryptjs');
const UserModel = require('../../model/users');
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
                const newUser = new UserModel({ name, username, password: hash });

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

module.exports.sendverification = (req, res, next) => {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "lannguyenhcm13101999@gmail.com",
            pass: "01667376890aa"
        }
    });
    var rand, mailOptions, host, link;
    rand = Math.floor((Math.random() * 10000) + 54);
    res.locals.rand = rand;
    host = req.get('host');
    console.log(host + "send host")
    console.log(res.locals.rand+"rand ne")

    link = "http://" + req.get('host') + "/user/emailverify/verify?id=" + rand + "&?userid=" + res.locals.user._id;
    mailOptions = {
        to: req.query.to,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
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

module.exports.verifyservice = (req, res, next) => {
    //  console.log(req.query.id + "ne");
    // console.log(res.locals.user._id + "ne");
    console.log(req.protocol + "://" + req.get('host'));
    console.log("Domain is matched. Information is from Authentic email");
    console.log(res.locals.rand + "dc")
    if (req.query.id == res.locals.rand) {
        console.log("email is verified");
        res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    }
    else {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}