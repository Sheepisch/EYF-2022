const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('destination/destinationHome')
})

router.get('/weather', (req, res) => {
    res.render('destination/weather')
})

router.get('/sights', (req, res) => {
    res.render('destination/sights')
})



module.exports = router