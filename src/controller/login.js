
const userDb = require('../models/mensajes').userCollection
const createSession = async (req, res) => {
    req.session.reload
    const {user, password} = req.body
    userDb.findOne({ user }).then(result => {
        if (result.password !== password) res.status(300).redirect('/login')
    req.session.user = result
    req.session.save()
    const headerObj = {isLogged:true, name:req.session.user.nombre}
    res.render('chat', headerObj)
    }).catch(err => {
        res.status(300).redirect('/login')
        console.error(err)
    })
    }
module.exports = createSession
