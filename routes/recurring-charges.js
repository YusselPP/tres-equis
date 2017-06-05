var express = require('express');

var RecurringChargesCtrl = require('../controllers/recurring-charges.controller');

var router = express.Router();

router.get('/install', RecurringChargesCtrl.install);
router.get('/auth', RecurringChargesCtrl.auth);
router.get('/login', RecurringChargesCtrl.login);
router.get('/subscribe', RecurringChargesCtrl.subscribe);
router.post('/subscribe', RecurringChargesCtrl.newSubscription);
router.get('/products/:product_id/metafields.json', RecurringChargesCtrl.getProductMetafields);

router.use(express.static('proxy-liquid', { setHeaders: function (res) {
    res.set('Content-type', 'application/liquid');
}}));

router.use(express.static('proxy-scripts'));

module.exports = {
    rootUrl: '/recurring-charges',
    router: router
};
