var express = require('express');

var RecurringChargesCtrl = require('../controllers/recurring-charges.controller');

var router = express.Router();

router.get('/install', RecurringChargesCtrl.install);

router.get('/auth', RecurringChargesCtrl.auth);

module.exports = {
    rootUrl: '/recurring-charges',
    router: router
};
