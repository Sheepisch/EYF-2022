const express = require('express')
const app = express()

const webshopRouter = require('./public/routes/webshop')
const earthRouter = require('./public/routes/earth_page')
const gamesRouter = require('./public/routes/gamesHomepage')
const weatherRouter = require('./public/routes/weather')
const mediaRouter = require('./public/routes/media')
const adminRouter = require('./public/routes/admin')

const connection = require('./db_config')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use('/webshop', webshopRouter)
app.use('/earth', earthRouter)
app.use('/games', gamesRouter)
app.use('/weather', weatherRouter)
app.use('/media', mediaRouter)
app.use('/admin', adminRouter);

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