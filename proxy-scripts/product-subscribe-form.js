;(function () {
    var product;

    try {
        product = JSON.parse($('script#ProductJson-product-template').text());
    } catch (e) {}

    console.log(product);

    if (!product) return;

    $.get('/admin/products/'+product.id+'/metafields.json?namespace=ayma-recurring&key=isSubscriptionActive')
        .done(function (data) {
            var isSubscriptionActive;
            console.log(data.metafields);
            if (!data || !data.metafields || data.metafields.length === 0) return;

            isSubscriptionActive = !!data.metafields[0].value;

            console.log(isSubscriptionActive);

            if (!isSubscriptionActive) return;

            // create subscribe form
            //var subscribeForm = $('<form></form>');

            //subscribeForm.append('<button type="submit" class="btn">Suscribirse</button>');

            //$('#shopify-section-product-template')
            //    .find('form[action="/cart/add"]')
            //    .after(subscribeForm);

            $('#shopify-section-product-template')
                .find('form[action="/cart/add"]')
                .append('<button type="submit" class="btn">Suscribirse</button>');
        });
}());