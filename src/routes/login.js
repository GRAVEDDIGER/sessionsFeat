const router = require('express').Router()
const createSession = require('../controller/login')
router.get('/', (req, res) => {
    res.render('login')
})
router.post('/', createSession)

module.exports = router
