const router = require('express').Router()
const obtenerData = require('../controller/product')
router.get('/', obtenerData)
module.exports = router
