var express = require('express');
var router = express.Router();


router.get('/register', function(req, res, next) {
  //redirger vers welcome (/public)
  res.redirect('/register.html');
});

module.exports = router;
