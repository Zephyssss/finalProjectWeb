const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var useraccoutschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
},
    {
        collection: 'useraccout'

    });

const user = db.useDb("mydb").model("user", useraccoutschema);

module.exports = user;