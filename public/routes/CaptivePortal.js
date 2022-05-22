const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('CaptivePortal/CaptivePortal')
})
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router