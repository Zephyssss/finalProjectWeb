var express = require('express');
var router = express.Router();
const pro = require('../model/category');

router.get('/', async (req, res) => {
  let value
  try {
    value = await pro.proByid(req.query.q);

  } catch (error) {
    console.log("Error!")
  }

  console.log("get data successfully");
  res.render('singleproduct', { value })
})

module.exports = router;