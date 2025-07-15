import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
});

const User = mongoose.model('User', userSchema);

export default User;