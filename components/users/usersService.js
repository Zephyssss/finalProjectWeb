const bcrypt = require('bcryptjs');
const UserModel = require('../../model/users');

module.exports.createUser = (name, username, password) => {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new UserModel({ name, username, password: hash });
    return newUser.save();
};