
import mongoose from "mongoose"



//creating user schema for the database


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:Number,required:false},
    phone:{type:Number,required:false},
  
})
``

const User=mongoose.model("user",userSchema);


export default User