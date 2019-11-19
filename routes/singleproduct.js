var express = require('express');
const mongoose = require('mongoose');
var db=mongoose.connection;
var router = express.Router();




var categoryschema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    details: String,
    img: String 
  },
  {
    collection:'category'
  
  });
  
  // load data
  // const cate = db.useDb("mydb").model("cate",categoryschema);
  // router.get('/', function (req, res) {   
  // cate.findById(req.query.q, function (err, value) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //      // console.log("get data successfully");
  //       console.log(value);
  //         res.render('singleproduct', {value })
  //     }
  // })
  // })
  
  const cate = db.useDb("mydb").model("cate",categoryschema);
  router.get('/', async  (req, res)=> {
    let value
    try {
      value = await cate.findById(req.query.q);
      
    } catch (error) {
      console.log("loi ne")
    }
    
    console.log("get data successfully");
    console.log(value);
    res.render('singleproduct', {value })
      })

module.exports = router;