var conekta = require('conekta');

conekta.api_key = process.env.CONEKTA_API_KEY;
conekta.api_version = process.env.CONEKTA_API_VERSION;
conekta.locale = process.env.CONEKTA_LOCALE;

module.exports = conekta;
