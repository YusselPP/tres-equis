var log = require('./logger')('components/conekta');
var conekta = require('conekta');

conekta.api_key = process.env.CONEKTA_API_KEY;
conekta.api_version = process.env.CONEKTA_API_VERSION;
conekta.locale = process.env.CONEKTA_LOCALE;

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
        cleanResource(this.Customer);
        console.log(this.Customer);
        return this.Customer;
    }
});

function cleanResource(resource) {
    resource._id = null;
    resource._json = {};
    resource._items = [];
}

module.exports = conekta;
