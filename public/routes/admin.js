const express = require('express')
const router = express.Router()
const mysql = require('../../db_config')

router.get('/', (req, res) => {
    mysql.query('SELECT * FROM product', (err, results) => {
        if (err) throw err
        res.render('admin/beheer', {products: results})
    })
})

module.exports = router