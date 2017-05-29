var express = require('express');

var RecurringChargesCtrl = require('../controllers/recurring-charges.controller');

var router = express.Router();

router.get('/install', RecurringChargesCtrl.install);

router.get('/auth', RecurringChargesCtrl.auth);

/*router.get('/product-subscribe-form.js', function (req, res) {
    res.header('Content-Type', 'application/liquid');
    res.send('{{product.id}}');
});*/

router.use(express.static('proxy-scripts'));

module.exports = {
    rootUrl: '/recurring-charges',
    router: router
};
