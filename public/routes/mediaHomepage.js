const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    res.render('media/mediaHome')
})

router.get('/movieList', (req, res) => {
    fs.readdir('./public/assets/video', (err, files) => {
        res.render('media/movieList', {videos:files})
    });
})

router.get('/movies', (req, res) => {
    res.render('media/movies')
})

router.get('/musicList', (req, res) => {
    fs.readdir('./public/assets/music', (err, files) => {
        res.render('media/musicList', {songs:files})
    });
})

router.get('/music', (req, res) => {
    res.render('media/music')
})

module.exports = router