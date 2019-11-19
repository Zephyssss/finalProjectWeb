var express = require('express');
const mongoose = require('mongoose');
var db = mongoose.connection;
var router = express.Router();


//create schame
var categoryschema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  details: String,
  img: String
},
  {
    collection: 'category'

  });

const cate = db.useDb("mydb").model("cate", categoryschema);
router.get('/', async (req, res) => {
  let value
  if (typeof req.query.q === 'undefined') {
    try {
      value = await cate.find({})
    } catch (error) {
      console.log("loi roi");
      res.render('error');

    }
    console.log("get data successfully");
    res.render('category', { title: 'category', list: value })
  }
  else {
    try {
      value = await cate.find({ 'categoryid': req.query.q})
    } catch (error) {
      console.log("loi roi");
      res.render('error');
    }
    console.log("query la:" + req.query.q);
    if (value && value.length)
      res.render('category', { title: value[0].category, list: value })
    else
      res.render('category', { list: value })

  }
})

module.exports = router;

