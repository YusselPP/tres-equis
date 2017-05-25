;(function () {

    var subscribeForm = $('<form></form>');

    subscribeForm.append('<select></select>');

    $('#shopify-section-product-template')
        .find('form[action="/cart/add"]')
        .after(subscribeForm);
}());