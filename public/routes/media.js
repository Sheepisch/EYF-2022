const express = require('express')
const router = express.Router()
const fs = require('fs')
const testFolder = './public/assets/video';
const app = express();

// app.get('',(req,res)=>{
//     res.send('Hoi Hoi')
// })
// router.get('/', ( req, res) => {
//     res.render('<h1>Hoi</h1>');
// })
router.get('/', ( req, res) => {
    // res.render('media');
    fs.readdir(testFolder, (err, files) => {
        res.render('media');
    });
console.log(testFolder);
})

// router.get('/', ( req, res) => {
//     fs.readdir(testFolder, (err, files) => {
//         res.send('<h1>Hoi</h1>');
//     });
// })


// Basic route:
// router.get('/', (req, res) => {
//     res.render('media')
// })

module.exports = router