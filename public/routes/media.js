const express = require('express')
const router = express.Router()
const fs = require('fs')
const testFolder = './public/assets/video';

router.get('/', ( req, res) => {
    // res.tetris_render('media');
    fs.readdir(testFolder, (err, files) => {
        res.render('media');
    });
console.log(testFolder);
})

// Basic route:
// router.get('/', (req, res) => {
//     res.tetris_render('media')
// })

module.exports = router