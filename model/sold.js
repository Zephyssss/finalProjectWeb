const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const CommentSchema = new mongoose.Schema({
    sp: Object,
    idUser: String,
    name: String,
    phone:String,
    email:String,
    add1:String,
    add2:String,
    zip: Number,
    date: Date,
    status: String
},
    {
        collection: 'sold'
    });

    const sold = db.useDb("mydb").model("sold", CommentSchema);


module.exports = sold;