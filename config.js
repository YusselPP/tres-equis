const env = process.env;
const config = {
    rootDir: __dirname,
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
        accessToken: env.SHOPIFY_ACCESS_TOKEN,

        shopName: 'recurring-charges',
        shopUrl: 'yussel.myshopify.com',
        scopes: 'read_content, write_products, write_orders, read_customers, write_script_tags'
    }
};

module.exports = config;
