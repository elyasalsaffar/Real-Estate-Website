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

const updateIsApprovedById = async (req, res) => { //to be continued
    try {
        const listing = await listing.findByIdAndUpdate(req.params.id, req.body, {
            isApproved: true
        })
    } catch (error) {
        console.error('An error has occurred updating a requests Approve/ Reject status');
    }
};

const getAllRequestListings = async (req, res) => {
    try {
        const listings = await Listing.find({ isApproved: true });
        res.render('./listings/requestsList.ejs', { listings });
    } catch (error) {
        console.error('An error has occurred getting requests lists');
    }
};

module.exports = {
    getAllListings,
    getSingleListing,
    getAllRequests,
    getAllRequestListings,
    approveListing,
    rejectListing
}