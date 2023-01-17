// //////////////////
//  Imports       //
// //////////////////

const express = require('express')
const morgan = require('morgan')
const socket = require('socket.io')
const path = require('path')
const handlebars = require('express-handlebars')
const colors = require('colors')
const products = require('./routes/product.js')
const chat = require('./routes/chat')
const login = require('./routes/login')
const register = require('./routes/register')
const app = express()
const session = require('express-session')
const FileStorage = require('session-file-store')
const Store = FileStorage(session)
const messagePersistance = require('./models/mensajes').userModel

// ///////////////////
//  Middlewares    //
// ///////////////////
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  store: new Store({
    path: './sessions',
    ttl: 3600
     }),
  secret: 'Lorem Ipsum',
  resave: false,
  saveUninitialized: false
}))
app.use('/products', products)
app.use('/chat', chat)
app.use('/login', login)
app.use('/register', register)
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')
const PORT = process.env.PORT || 8080
app.use(morgan('tiny'))
app.use((req, res) => { // ruta default desvia a login
  res.status(300).redirect('/login')
})
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`.bgBlue.white)
})
// /////////////////////
// Sockets           //
// /////////////////////
const socketSrv = socket(server)
socketSrv.on('connection', async (socket) => {
  console.log(colors.bgCyan.white.bold('WebSockets Connected'))
  const data = await messagePersistance.find()
  socket.emit('serverMessage', JSON.stringify(data))
  socket.on('clientMessage', (message) => {
    console.log(colors.bgGreen.bold(message))
    messagePersistance.create(JSON.parse(message))
    socketSrv.emit('serverMessage', message)
  })
})
