const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required:true
    },
    email:{
        type: String,
        trim: true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    token:{
        type:String
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }],
})

module.exports = mongoose.model('User',userSchema);