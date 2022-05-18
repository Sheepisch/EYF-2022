const express = require('express')
const app = express()

const webshopRouter = require('./public/routes/webshop')
const earthRouter = require('./public/routes/earth_page')
const gamesRouter = require('./public/routes/gamesHomepage')
const weatherRouter = require('./public/routes/weather')

const connection = require('./db_config')

app.set('view engine', 'ejs')

app.use('/webshop', webshopRouter)
app.use('/earth', earthRouter)
app.use('/games', gamesRouter)
app.use('/weather', weatherRouter)

app.listen(3000, function() {
    connection.connect(function(err) {
        if (err) throw err
        console.log('database connected!')
    })
})

app.get('/', function(req, res) {
    res.render('index')
})

app.use(express.static(__dirname + '/public'))