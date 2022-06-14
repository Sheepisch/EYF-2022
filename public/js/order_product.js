
const price = document.getElementById('cart-price')

async function getPrice() {
    await price.value;
}

window.onload = function() {
    getPrice();
}