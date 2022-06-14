const express = require('express')
const router = express.Router()
const mysql = require('../../db_config')

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM product', (err, results) => {
        if (err) throw err
        res.render('webshop', {products: results})
    })
})

router.get('/order/:product_id', (req, res) => {
    mysql.query('SELECT * FROM product WHERE product_id = ?', [req.params.product_id], (err, results) => {
        if (err) throw err
        res.render('order_product', {product: results[0]})
    })
})

router.post('/order_product/purchase/:product_id', (req, res) => {
    const id = req.params.product_id;
    const quantity = req.body.quantity;
    const seat = req.body.seat;

    mysql.query('INSERT INTO orders (product_id, quantity, seat) VALUES (?, ?, ?)', [id, quantity, seat], (err, results) => {
        if (err) throw err
    })
    res.redirect('/webshop');
});

module.exports = router