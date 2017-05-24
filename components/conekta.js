var config = require('../config');
var log = require('./logger')(__filename);
var conekta = require('conekta');

conekta.api_key = config.conekta.apiKey;
conekta.api_version = config.conekta.apiVersion;
conekta.locale = config.conekta.locale;

conekta.Card.getById = function (id) {
    var paymentSource, paymentSources = this;

    if (paymentSources._json.object !== 'list') return;

    paymentSource = paymentSources._json.data.reduce(function (prev, current, currentIndex) {
        log.debug('Customer payment source id=' + current.id);
        if (current.id === id) {
            return paymentSources.get(currentIndex);
        } else {
            if (currentIndex === 0) prev = undefined;
            return prev;
        }
    }, {});

    return paymentSource;
};

Object.defineProperty(conekta, 'cCustomer', {
    get: function() {
        cleanResource(conekta.Customer);
        return conekta.Customer;
    }
});

function cleanResource(resource) {
    resource._id = null;
    resource._json = {};
    resource._items = [];
}

module.exports = conekta;
