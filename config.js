const env = process.env;
const config = {
    port: env.PORT,

    log: {
        level: env.LOG_LEVEL
    },

    conekta: {
        apiKey: env.CONEKTA_API_KEY,
        apiVersion: env.CONEKTA_API_VERSION,
        locale: env.CONEKTA_LOCALE
    },

    shopify: {
        appUrl: env.SHOPIFY_APP_URL,
        apiKey: env.SHOPIFY_API_KEY,
        secret: env.SHOPIFY_SECRET,

        shop: 'miel-tres-equis.myshopify.com',
        scopes: 'read_content, read_products, read_customers'
    }
};

module.exports = config;
