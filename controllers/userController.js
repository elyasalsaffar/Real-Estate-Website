const User = require('../models/User.js');

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('listings');
        const data = {
            first: user.first,
            last: user.last,
            picture: user.picture,
            isAdmin: user.isAdmin,
            listings: user.listings
        };
        res.render('./users/profile.ejs', { user: data });
    } catch (error) {
        console.error('An error has occurred finding a user!', error.message);
    }
};

module.exports = {
    getUserById
}