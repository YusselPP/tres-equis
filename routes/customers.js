var express = require('express');
var router = express.Router();
var conekta = require('../models/conekta');

// Find customer by id
router.get('/:customer_id', function(req, res, next) {
    conekta.Customer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        res.send(customer.toObject());
    });
});

// Create a customer
router.post('/', function(req, res, next) {
    conekta.Customer.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        res.send(customer.toObject());
    });
});

// Remove customer
// /customers/:customer_id			DELETE


// Add a card to a customer
// /customers/:customer_id/card			POST

// Remove a card from a customer
// /customers/:customer_id/card/:card_id	DELETE




// Add a subscription to a customer
// /customers/:customer_id/subscription		POST

// Cancel customer’s subscription
// /customers/:customer_id/subscription/cancel	POST

module.exports = router;
