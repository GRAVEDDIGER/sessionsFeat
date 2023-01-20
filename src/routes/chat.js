const router = require('express').Router()
const getData = require('../controller/chat')
router.get('/', getData)
module.exports = router
