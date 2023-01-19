const router = require('express').Router()
const userDb = require('../models/mensajes').userCollection
router.get('/', (req, res) => {
    req.session.destroy()
    res.render('login')
})
router.post('/', async (req, res) => {
    const {user, password} = req.body
userDb.findOne({ user }).then(result => {
    if (result.password !== password) res.status(300).redirect('/login')
req.session.user = result
req.session.save()
res.status(300).redirect('chat')
}).catch(err => {
    res.status(300).redirect('/login')
    console.error(err)
})
})

module.exports = router
