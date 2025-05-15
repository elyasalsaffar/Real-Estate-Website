const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    }
},
{ timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;