const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var categoryschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    details: String,
    categoryid: String,
    img: String
},
    {
        collection: 'category'

    });

const cate = db.useDb("mydb").model("cate", categoryschema);

module.exports = cate;

// module.exports={
//     all: async () =>{
//         const result=await cate.find({});
//         return result;
//     },
//     allCate: async (id) =>{
//         const result = await cate.find({'categoryid': id});
//         return result;
//     },
//     proByid: async (id) =>{
//         const result = await cate.findById(id);
//         return result;
//     }
// }