const User = require('../models/User.js');
const Listing = require('../models/Listing.js');

const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render('./listings/all.ejs', { listings });
    } catch (error) {
        console.error('An error occurred getting all listings!', error.message);
    }
};

module.exports ={
    getAllListings
}