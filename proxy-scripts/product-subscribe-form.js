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
            var subscribeForm = $('<form method="get" action="/apps/recurring-charges/subscribe-form/" style="margin: 10px 0 0 100px"></form>');

            subscribeForm.append('<input type="hidden" name="product_id" value="' + product.id + '">');
            subscribeForm.append('<button type="submit" class="btn product-form__cart-submit product-form__cart-submit--small">Suscribirse</button>');

            $('#shopify-section-product-template')
               .find('form[action="/cart/add"]')
               .after(subscribeForm);
        });

    // var subscribeForm = $('<iframe src="/apps/recurring-charges/subscribe-form/" frameborder="0" height="51px" width="100%"></iframe>');
    // $('#shopify-section-product-template')
    //            .find('form[action="/cart/add"]')
    //            .after(subscribeForm);

}());