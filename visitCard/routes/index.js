var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //redirger vers welcome (/public)
  res.redirect('/welcome.html');
});

module.exports = router;
