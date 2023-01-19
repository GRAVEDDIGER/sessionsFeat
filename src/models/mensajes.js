const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config()
const url = process.env.MONGO_URL1 + process.env.MONGO_PASS + process.env.MONGO_URL2
const dbConnect = async () => {
    mongoose.set('strictQuery', true)
    return mongoose.connect(url)
  }
  console.log(url)
dbConnect()
    .then(() => console.log(colors.bgGreen.white.bold('Mongo connected')))
    .catch(() => console.log(colors.bgRed.bold('Unable to connect DB')))

const Schema = mongoose.Schema
const messageSchema = new Schema({
    author:{
        id:{type:String, required:true},
        nombre:{type:String, required:true},
        apellido:{type:String, required:true},
        edad:{type:String, required:true},
        alias:{type:String, required:true},
        avatar:{type:String, required:true}

    },
    text:{
        type:'string'
    }}, {timestamps:true}

)
const userSchema = new Schema({
    user: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    nombre:{type:String, required:true},
        apellido:{type:String, required:true},
        edad:{type:String, required:true},
        alias:{type:String, required:true},
        avatar:{type:String, required:true}

})
const userCollection = mongoose.model('userCollection', userSchema)
const userModel = mongoose.model('messageCollection', messageSchema)
module.exports = {userModel, userCollection}
