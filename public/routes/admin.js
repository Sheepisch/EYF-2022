const express = require('express')
const router = express.Router()
const mysql = require('../../db_config')

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM product', (err, results) => {
        if (err) throw err
        res.render('admin/beheer', {products: results})
    })
})

router.post('/add_product', async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    const img = req.body.img;

    mysql.query('INSERT INTO product (name, category, price, description, img) VALUES (?, ?, ?, ?, ?)', [name, category, price, description, img], (err, results) => {
        if (err) throw err
        res.redirect('/');
    })
});

module.exports = router