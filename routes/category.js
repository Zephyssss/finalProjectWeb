var express = require('express');
var router = express.Router();
const pro = require('../model/category');


router.get('/', async (req, res) => {
  let value
  if (typeof req.query.q === 'undefined') {
    try {
      value = await pro.all();
    } catch (error) {
      console.log("Error!");
      res.render('error');

    }
    console.log("get data successfully");
    res.render('category', { title: 'category', list: value })
  }
  else {
    try {
      value = await pro.allCate(req.query.q);
    } catch (error) {
      console.log("Error!");
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

