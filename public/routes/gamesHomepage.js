const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('games/gamesHome')
})

router.get('/memory', (req, res) => {
    res.render('games/memory')
})

router.get('/noughtCrosses', (req, res) => {
    res.render('games/noughtCrosses')
})

router.get('/snake', (req, res) => {
    res.render('games/snake')
})

router.get('/hangman', (req, res) => {
    res.render('games/hangman')
})

module.exports = router