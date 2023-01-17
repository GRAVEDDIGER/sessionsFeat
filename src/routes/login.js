const router = require('express').Router()
const userDb = require('../models/mensajes').userCollection

router.get('/', (req, res) => {
    res.render('login')
})
router.post('/', async (req, res) => {
const databaseUserData = await userDb.findOne({user:req.body.user})
console.log(await databaseUserData)
})
module.exports = router
