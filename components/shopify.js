var config = require('../config');

var shopify = {};

shopify.getInstallUrl = getInstallUrl;

module.exports = shopify;


function getInstallUrl() {
    var installUrl = [];

    installUrl.push('http://');
    installUrl.push(config.shopify.shop);
    installUrl.push('/admin/oauth/authorize?client_id=');
    installUrl.push(config.shopify.apiKey);
    installUrl.push('&scope=');
    installUrl.push(config.shopify.scopes);
    installUrl.push('&redirect_uri=http://');
    installUrl.push(config.shopify.appUrl);
    installUrl.push('/tres-equis/auth');

    return installUrl.join('');
}
