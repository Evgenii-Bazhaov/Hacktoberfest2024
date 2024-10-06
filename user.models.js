import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema =new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    },
   profilePicture:{
         type:String,
         default:'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'
    },
    isAdmin:{
        type:Boolean,
        default:false
    } ,
   
},{timestamps:true})


export const User =mongoose.model('User',userSchema)

export default User;