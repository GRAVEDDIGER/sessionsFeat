const router=require('express').Router()
const obtenerData =require('../controller/product')
router.get('/',obtenerData)
console.log(obtenerData)
module.exports=router
