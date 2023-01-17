const router =require('express').Router()
const userDb=require('../models/mensajes').userCollection
router.get('/',(req,res)=>{
    res.render('register')

})
router.post('/',async (req,res)=>{
 userDb.create(req.body)
    .then(()=>res.redirect('/login'))
    .catch(err=>{
          console.log(err)
          res.redirect('/register')
        })
    
    })

module.exports=router