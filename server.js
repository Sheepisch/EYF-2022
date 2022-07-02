const express = require('express')
const app = express()
const appPort = 3000;

const socket = require('socket.io');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const webshopRouter = require('./public/routes/webshop')
const earthRouter = require('./public/routes/earth_page')
const gamesRouter = require('./public/routes/gamesHomepage')
const destinationRouter = require('./public/routes/destination')
const mediaRouter = require('./public/routes/media')
const adminRouter = require('./public/routes/beheer/admin')
const chatRouter = require('./public/routes/chatbox')
const captivePortalRouter = require('./public/routes/captivePortal')

const connection = require('./db_config')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use('/webshop', webshopRouter)
app.use('/earth', earthRouter)
app.use('/games', gamesRouter)
app.use('/destination', destinationRouter)
app.use('/media', mediaRouter)
app.use('/admin', adminRouter)
app.use('/chatBox', chatRouter)
app.use('/captivePortal',captivePortalRouter);

app.get('/', function(req, res) {
    res.render('index')
})

app.use(express.static ("public"))

io.on('connection', function(socket){
    console.log('connected')

    socket.on('New-client', message=>{
        socket.broadcast.emit('client', message);
    })

    socket.on('message', data => {
        let name = data.name;
        let message = data.message;

        io.emit('message', data);
    })
}); 

server.listen(appPort, function() {
    connection.connect(function(err) {
        if (err) throw err
        console.log('database connected!')
    })
})