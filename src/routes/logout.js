const router = require('express').Router()
router.get('/', (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
     res.render('login')
})

module.exports = router
