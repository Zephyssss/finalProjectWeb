const mongoose = require('mongoose');
const db = mongoose.connection;

//create schame
const categoryschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    details: String,
    categoryid: String,
    img: String,
    views: { type: Number, default: 0 },
    sold: { type: Number, default: 0 }
},
    {
        collection: 'category'
    });
//categoryschema.index({"name": "text"});
//db.collection.createIndex({"name":"text"});
categoryschema.index({name: 'text'});

const cate = db.useDb("mydb").model("cate", categoryschema);


module.exports = cate;