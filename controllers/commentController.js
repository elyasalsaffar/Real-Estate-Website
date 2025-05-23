const Comment = require('../models/Comment.js');
const Listing = require('../models/Listing.js');
const User = require('../models/User.js');

const createComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { id: listingId } = req.params;
        const userId = req.session.user._id;

        const newComment = await Comment.create({
            comment,
            author: userId,
            listing: listingId
        });

        await Listing.findByIdAndUpdate(listingId, { $push: { comments: newComment._id } });
        await User.findByIdAndUpdate(userId, { $push: { comments: newComment._id } });

        res.redirect(`/listings/${listingId}`);
    } catch (error) {
        console.error('An error occurred adding a comment', error.message);
    }
};

module.exports = {
    createComment
}