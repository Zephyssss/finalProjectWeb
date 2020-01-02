const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const CommentSchema = new mongoose.Schema({
    name:String,
    productid: String,
    comment: String,
    date: String
},
    {
        collection: 'comment'
    });

    const comments = db.useDb("mydb").model("comments", CommentSchema);


module.exports = comments;