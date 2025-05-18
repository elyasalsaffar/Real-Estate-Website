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

// const getSingleListing = async (req, res) => {
//     try {
//         const listing = await Listing.findById(req.params.id);
//         res.render('./listings/show.ejs', { listing });
//     } catch (error) {
//         console.error('An error occurred getting a single listing!', error.message);
//     }
// };

const getSingleListing = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to fetch listing with ID:', id); // ADD THIS LINE

        const listing = await Listing.findById(id);

        if (!listing) {
            console.log(`Listing with ID ${id} not found.`); // ADD THIS LINE
            return res.status(404).send('Listing not found');
        }

        console.log('Successfully fetched listing:', listing); // ADD THIS LINE
        res.render('./listings/show.ejs', { listing });
    } catch (error) {
        console.error('An error occurred getting a single listing!', error.message);
    }
};

module.exports ={
    getAllListings,
    getSingleListing
}