const mongoose = require("mongoose")
console.log("ingreso a esquema")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("users",userSchema)