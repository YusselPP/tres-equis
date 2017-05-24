var config = require('../config');
var log = require('../components/logger')(__filename);
var Shopify = require('../components/shopify');

module.exports = {
    install: install,
    auth: auth
};

function install(req, res) {
    res.redirect(Shopify().buildAuthURL());
}

function auth(req, res) {
    Shopify().exchange_temporary_token(req.query, function(err, data){
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
