const express = require('express')
const { redirect } = require('express/lib/response')
const router = express.Router()
const mysql = require('../../db_config')

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM product', (err, results) => {
        if (err) throw err
        res.render('admin/beheer', {products: results})
    })
})

router.post('/add_product', (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    const img = req.body.img;

    mysql.query('INSERT INTO product (name, category, price, description, img) VALUES (?, ?, ?, ?, ?)', [name, category, price, description, img], (err, results) => {
        if (err) throw err
        res.redirect('/admin');
    })
});

router.get('/delete_product/:id', (req, res) => {
})

router.delete('/delete_product/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    try {
        mysql.query('DELETE FROM product WHERE product_id = ?', [product_id]);
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router