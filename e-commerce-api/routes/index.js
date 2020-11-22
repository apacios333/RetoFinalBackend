var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RETO Final. API REST. Backend e-COMMERCE' });
});

module.exports = router;
