var express = require('express');
var router = express.Router();
var log = require('../components/logger')('routes/tresEquis');
var shopify = require('../components/shopify');
var crypto = require('crypto');

var config = require('../config');

router.get('/install', function(req, res, next) {
    res.redirect(shopify.getInstallUrl());
});

router.get('/auth', function(req, res, next) {
    var s = 'code=' + req.query.code +
        '&shop=' + req.query.shop +
        '&timestamp=' + req.query.timestamp;
    var r = crypto
        .createHmac('SHA256', config.shopify.secret)
        .update(s)
        .digest('hex');

    res.send({
        query: req.query,
        r: r
    });
});

module.exports = router;
