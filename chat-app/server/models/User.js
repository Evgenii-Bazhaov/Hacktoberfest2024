const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        required:true
    },
    lastName:{
        type: String,
        trim: true,
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
})

module.exports = mongoose.model("User", UserSchema);