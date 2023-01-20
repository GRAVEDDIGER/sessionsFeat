const userDb = require('../models/mensajes').userCollection

const createUser = async (req, res) => {
    userDb.create(req.body)
       .then(() => res.redirect('/login'))
       .catch(err => {
             console.log(err)
             res.redirect('/register')
           })
       }
module.exports = createUser
