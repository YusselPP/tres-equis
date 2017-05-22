var express = require('express');
var router = express.Router();
var conekta = require('../models/conekta');

/* GET home page. */
router.get('/:customer_id', function(req, res, next) {
    conekta.Customer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        res.send(customer.toObject());
    });
});

module.exports = router;
