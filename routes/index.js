var router = require('express').Router();

var customers = require('./customers');
var tresEquis = require('./shopifyApp');
var recurringCharges = require('./recurring-charges');

// /customers
router.use(customers.rootUrl, customers.router);
// /{config.shopify.shopName}
router.use(tresEquis.rootUrl, tresEquis.router);

router.use(recurringCharges.rootUrl, recurringCharges.router);

module.exports = router;
