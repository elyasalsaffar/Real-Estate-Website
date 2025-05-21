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

const editListringForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    res.render('./listings/edit', { listing})
}; 

const updateListing = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/users/' + req.session.user._id)
}

const deleteListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id)
    res.redirect('/users/' + req.session.user._id)
}

module.exports ={
    getAllListings, 
    editListringForm,
    updateListing, 
    deleteListing
}