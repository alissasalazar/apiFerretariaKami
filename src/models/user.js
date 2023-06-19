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
    },role:{
        type:String,
        required:true
    }
})

userSchema.pre("save", (next) =>{
    //Verifico si es usuario nuevo o se esta actualizando
})
module.exports = mongoose.model("users",userSchema)