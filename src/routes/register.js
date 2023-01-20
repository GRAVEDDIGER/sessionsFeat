const router = require('express').Router()
const createUser = require('../controller/register')

router.get('/', (req, res) => {
    res.render('register')
})
router.post('/', createUser)

module.exports = router
