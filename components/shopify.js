var shopifyAPI = require('shopify-node-api');
var nonce = require('nonce-generator');

var config = require('../config');
var log = require('./logger')(__filename);

var shopify = {};

module.exports = function () {
    return new shopifyAPI({
        shop: config.shopify.shopUrl, // shop.myshopify.com 
        shopify_api_key: config.shopify.apiKey, // Your API key 
        shopify_shared_secret: config.shopify.secret, // Your Shared Secret 
        shopify_scope: config.shopify.scopes,
        redirect_uri: config.shopify.appUrl + '/' + config.shopify.shopName + '/auth',
        nonce: '' // you must provide a randomly selected value unique for each authorization request
    });
};

