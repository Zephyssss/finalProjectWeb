const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const verifyschema = new mongoose.Schema({
    userid:String,
    id:Number
    },
    {
        collection: 'verifyid'
    });

const verifyid = db.useDb("mydb").model("verifyid", verifyschema);

module.exports = verifyid;