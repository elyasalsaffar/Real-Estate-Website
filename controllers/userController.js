const User = require('../models/User.js');

const getUserById = async (req, res) => {
    try {
        if (req.session.user._id !== req.params.id) {
            return res.status(403).send('Unauthorized')
        }
        const user = await User.findById(req.params.id).populate('listings');
        const data = {
            first: user.first,
            last: user.last,
            picture: user.picture,
            listings: user.listings
        };
        res.render('./users/profile.ejs', { user: data });
    } catch (error) {
        console.error('An error has occurred finding a user!', error.message);
        res.status(500).send('An error has occured finding a user!')
    }
};

module.exports = {
    getUserById
}