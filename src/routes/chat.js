const router = require('express').Router()
router.get('/', (req, res) => {
let headerObj = {isLogged:false}
    if (req.session.user !== undefined) {
        headerObj = {isLogged:true, name:req.session.user.nombre}
    } else headerObj = {isLogged:false}
    res.render('chat', headerObj)
})
module.exports = router
