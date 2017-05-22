var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Holi ness <3' });
  res.send({
    id: 1
  });
});

module.exports = router;
