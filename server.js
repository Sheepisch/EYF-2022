const express = require('express')
const app = express()
// const connection = require('./db_config')

// app.listen(3000, function() {
//     connection.connect(function(err) {
//         if (err) throw err
//         console.log('database connected!')
//     })
// })
app.listen(3000)
app.use(express.static('public'))