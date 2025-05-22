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

const getAllRequests = async (req, res) => {
    try {
        const pendingListings = await Listing.find({ isApproved: {$in: [ null, undefined ]} });
        const approvedListings = await Listing.find({ isApproved: true });
        const rejectedListings = await Listing.find({ isApproved: false });
        res.render('./listings/requests.ejs', { pendingListings, approvedListings, rejectedListings, user: req.user });
    } catch (error) {
        console.error('An error occurred getting all request listings!', error.message);
    }
};

const approveListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        res.redirect('/listings/requests');
    } catch (error) {
        console.error('An error occurred accepting a pending listing!', error.message);
    }
};

const rejectListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { isApproved: false }, { new: true });
        res.redirect('/listings/requests');
    } catch (error) {
        console.error('An error occurred rejecting a pending listing!', error.message);
    }
};

const getSingleListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render('./listings/show.ejs', { listing });
    } catch (error) {
        console.error('An error occurred getting a single listing!', error.message);
    }
};

const createListing = async (req, res) => {
    try {
        const user = await User.findById(req.body.author);
        const listing = await Listing.create(req.body);
        user.listings.push(listing._id);
        user.save();
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error('An error has occurred adding a listing');
    }
};

module.exports = {
    getAllListings,
    getSingleListing,
    getAllRequests,
    approveListing,
    rejectListing,
    createListing
}