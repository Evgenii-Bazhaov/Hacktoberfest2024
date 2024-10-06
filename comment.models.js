import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const commentSchema =new Schema({
    content: {
        type: String,
        required: true,
      },
      postId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      likes: {
        type: Array,
        default: [],
      },
      numberOfLikes: {
        type: Number,
        default: 0,
      },


},{timestamps:true})

export const Comment =mongoose.model('Comment',commentSchema)
export default Comment;