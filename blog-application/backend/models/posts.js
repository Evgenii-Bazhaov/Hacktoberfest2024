const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    image:{
        type:String,
        // required: true
    },
    title:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Posts',postsSchema);