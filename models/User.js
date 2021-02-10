const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    profession:{
        type:String,
        trim:true,
        default:"Your profession"
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
        required:false
    },
    age:{
        type:Number,
        trim:true,
        default:0,
    },
    followers : [{type:Schema.Types.ObjectId, ref:"User"}],
    following:[{type:Schema.Types.ObjectId, ref:"User"}],
    role:{
        type:String,
        default:"User",
        enum:["User","Admin"]
    }
})
module.exports=mongoose.model("User",userSchema)