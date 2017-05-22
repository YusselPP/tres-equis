var express = require('express');
var router = express.Router();
var conekta = require('../components/conekta');
var log = require('../components/logger')('routes/customers');

// Find customer by email
router.get('/', function(req, res, next) {
    conekta.cCustomer.where({
        email: req.query.email
    }, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        res.send(customer.toArray());
    });
});

// Find customer by id
router.get('/:customer_id/', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        res.send(customer.toObject());
    });
});

// Create a customer
router.post('/', function(req, res, next) {
    conekta.cCustomer.create({
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
router.delete('/:customer_id', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        customer.delete(function (err, delcCustomer) {
            if (err) {
                res.status(err.http_code).send(err.details);
                return;
            }
            res.send(delcCustomer.toObject());
        });
    });
});

// Add a card to a customer
// /customers/:customer_id/card			POST
router.post('/:customer_id/card', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        customer.createPaymentSource({
            type: 'card',
            token_id: req.body.token_id
        }, function (err, response) {
            if (err) {
                res.status(err.http_code).send(err.details);
                return;
            }
            res.send(response);
        });
    });
});

// Remove a card from a customer
// /customers/:customer_id/card/:card_id	DELETE
router.delete('/:customer_id/card/:card_id', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        var paymentSource;
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        if (!customer.payment_sources ||
            !(paymentSource = customer.payment_sources.getById(req.params.card_id))
        ) {
            res.status(404).send([
                {
                    debug_message: 'The object payment_sources "' + req.params.card_id + '" could not be found.',
                    message: 'El recurso no ha sido encontrado.',
                    code: 'conekta.errors.resource_not_found.entity'
                }
            ]);
            return;
        }
        paymentSource.delete(function (err, response) {
            if (err) {
                res.status(err.http_code).send(err.details);
                return;
            }
            res.send(response);
        });
    });
});



// Add a subscription to a customer
// /customers/:customer_id/subscription		POST
router.post('/:customer_id/subscription', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        customer.createSubscription({
            plan: req.body.plan,
            card: req.body.card
        }, function (err, response) {
            if (err) {
                res.status(err.http_code).send(err.details);
                return;
            }
            res.send(response);
        });
    });
});

// Cancel customer’s subscription
// /customers/:customer_id/subscription/cancel	POST
router.post('/:customer_id/subscription/cancel', function(req, res, next) {
    conekta.cCustomer.find(req.params.customer_id, function(err, customer) {
        if (err) {
            res.status(err.http_code).send(err.details);
            return;
        }
        if (!customer.subscription) {
            res.status(404).send([
                {
                    debug_message: 'The subscription for the customer ' + req.params.customer_id + ' could not be found.',
                    message: 'No se encontró la suscripción.',
                    code: 'conekta.errors.resource_not_found.entity'
                }
            ]);
            return;
        }
        customer.subscription.cancel(function (err, response) {
            if (err) {
                res.status(err.http_code).send(err.details);
                return;
            }
            res.send(response);
        });
    });
});

module.exports = router;
