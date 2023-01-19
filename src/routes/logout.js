const router = require('express').Router()
const userDb = require('../models/mensajes').userCollection
router.get('/', (req, res) => {
    req.session.destroy()
    res.render('login')
})
