const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const products = [{
        name: 'Coca cola',
        description: '33ml bottle',
        price: '3.99',
        img: '../../assets/images/webshop/products/product-cola-can.png'
    },
    {
        name: 'Coca cola light',
        description: '33ml bottle',
        price: '3.99',
        img: '../../assets/images/webshop/products/product-cola-light-can.png'
    },
    {
        name: 'Coca cola zero',
        description: '33ml bottle',
        price: '3.99',
        img: '../../assets/images/webshop/products/product-cola-zero-can.png'
    },
    {
        name: 'Fanta',
        description: '33ml bottle',
        price: '4.50',
        img: '../../assets/images/webshop/products/product-fanta-can.png'
    },
    {
        name: 'Fanta exotic',
        description: '33ml bottle',
        price: '4.50',
        img: '../../assets/images/webshop/products/product-fanta-exotic-can.png'
    },
    {
        name: 'Ice-tea green',
        description: '33ml bottle',
        price: '4.50',
        img: '../../assets/images/webshop/products/product-ice-tea-green-can.png'
    },
    {
        name: 'Spa blauw',
        description: '50ml bottle',
        price: '3.00',
        img: '../../assets/images/webshop/products/product-spa-bottle.png'
    },
    {
        name: 'Spa rood',
        description: '50ml bottle',
        price: '3.00',
        img: '../../assets/images/webshop/products/product-spa-red-bottle.png'
    }
]

    res.render('webshop', {title: 'webshop', products})
})

module.exports = router