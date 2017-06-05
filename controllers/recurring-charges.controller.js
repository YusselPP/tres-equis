var path = require('path');

var config = require('../config');
var log = require('../components/logger')(__filename);
var Shopify = require('../components/shopify')();

module.exports = {
    install: install,
    auth: auth,
    login: login,
    subscribe: subscribe,
    newSubscription: newSubscription,
    getProductMetafields: getProductMetafields
};

function install(req, res) {
    res.redirect(Shopify.buildAuthURL());
}

function auth(req, res) {
    Shopify.exchange_temporary_token(req.query, function(err, data){
        // This will return successful if the request was authentic from Shopify
        // Otherwise err will be non-null.
        // The module will automatically update your config with the new access token
        // It is also available here as data['access_token']
        console.log(err, data);
    });

    res.send({
        query: req.query
    });
}

function login(req, res) {
    sendLiquidFile(res, '../proxy-liquid/login.liquid');
}

function subscribe(req, res) {
    sendLiquidFile(res, '../proxy-liquid/subscribe.liquid');
}

function newSubscription(req, res) {
    console.log(req);
    res.send({});
}

function getProductMetafields(req, res) {
    var query = {
        key: req.query.key,
        namespace: req.query.namespace
    };
    Shopify.get('/admin/products/' + req.params.product_id + '/metafields.json', query, function (err, data, headers) {
        if (err) {
            res.status(err.code).send(err);
            return;
        }
        res.send(data);
    });
}


/* Helper functions */

function sendLiquidFile(res, filePath) {
    res.set('Content-type', 'application/liquid');
    res.sendFile(path.join(__dirname, filePath));
}
