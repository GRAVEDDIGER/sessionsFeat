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
const session = require('express-session')
const FileStorage = require('session-file-store')
const Store = FileStorage(session)
const messagePersistance = require('./models/mensajes').userModel
const PORT = process.env.PORT || 8080
const app = express()
const sesssionMiddleware = session({
  store: new Store({
    path: './sessions',
    ttl: 3600
  }),
  secret: 'Lorem Ipsum',
  resave: false,
  saveUninitialized: false
})
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`.bgBlue.white)
})
app.use(express.static(path.join(__dirname, 'public')))
// ///////////////////
//  Middlewares    //
// ///////////////////

app.use(sesssionMiddleware)
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/products', products)
app.use('/chat', chat)
app.use('/login', login)
app.use('/logout', login)
app.use('/register', register)
app.use(morgan('tiny'))
app.use((req, res) => { // ruta default desvia a login
  res.status(300).redirect('/login')
})

// /////////////////////
// Sockets           //
// /////////////////////
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
const socketSrv = socket(server)
socketSrv.use(wrap(sesssionMiddleware))
socketSrv.on('connection', async (socket) => {
  console.log(colors.bgCyan.white.bold('WebSockets Connected'))
  socket.on('userRequest', () => {
    console.log('cosa')
   socket.emit('userResponse', JSON.stringify({
    author: {
      ...socket.request.session.user,
      id:socket.request.session.user.user,
      user:undefined,
      password:undefined
    }}))
  })
  const data = await messagePersistance.find()
  socket.emit('serverMessage', JSON.stringify(data))
  socket.on('clientMessage', (message) => {
    let messageParsed
    const msgObj = JSON.parse(message)
    console.log(colors.bgGreen.bold(msgObj))

    messageParsed = JSON.stringify({
      text:msgObj.text,
      author:{
      ...socket.request.session.user,
      id:socket.request.session.user.user,
      user:undefined,
      password:undefined
    }
    })
    messagePersistance.create(JSON.parse(messageParsed))
    socketSrv.emit('serverMessage', messageParsed)
  })
})
