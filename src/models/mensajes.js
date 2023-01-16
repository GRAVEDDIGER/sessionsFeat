const mongoose=require('mongoose');
const colors = require('colors');
require('dotenv').config()
const url = process.env.MONGO_URL1 + process.env.MONGO_PASS + process.env.MONGO_URL2
const dbConnect = async () => {
    mongoose.set('strictQuery', true)
    return mongoose.connect(url)
  }
  console.log(url)
dbConnect()
    .then(()=>console.log(colors.bgGreen.white.bold("Mongo connected")))
    .catch(()=>console.log(colors.bgRed.bold("Unable to connect DB")))

const Schema =mongoose.Schema
const messageSchema =new Schema({
    author:{
        id:{type:"string",required:"true", unique:"true"} ,
        nombre:{type:"string",required:"true"},
        apellido:{type:"string",required:"true"},
        edad:{type:'string',required:"true"},
        alias:{type:"string",required:"true"},
        avatar:{type:"string",required:"true"}
    },
    text:{
        type:"string"
    }},{timestamps:true}

)
const userModel=mongoose.model("messageCollection",messageSchema)
module.exports=userModel