const User = require('../models/User.js');
const Listing = require('../models/Listing.js');
const Comment = require('../models/Comment.js');

const getAllListings = async (req, res) => {
    try {
        const filterQuery = { isApproved: true };
        if (req.query.isForSale) {
            filterQuery.isForSale = (req.query.isForSale === 'true');
        }
        if (req.query.propertyType) {
            filterQuery.propertyType = req.query.propertyType;
        }
        const listings = await Listing.find(filterQuery);
        res.render('./listings/all.ejs', { listings, user: req.session.user });
    } catch (error) {
        console.error('An error occurred getting all listings!', error.message);
    }
};

const getAllRequests = async (req, res) => {
    try {
        const pendingListings = await Listing.find({ isApproved: {$in: [ null, undefined ]} });
        const approvedListings = await Listing.find({ isApproved: true });
        const rejectedListings = await Listing.find({ isApproved: false });
        res.render('./listings/requests.ejs', { pendingListings, approvedListings, rejectedListings, user: req.session.user });
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
        const listing = await Listing.findById(req.params.id).populate({ path: 'comments', populate: { path: 'author', select: 'first last' } });
        res.render('./listings/show.ejs', { listing, user: req.session.user });
    } catch (error) {
        console.error('An error occurred getting a single listing!', error.message);
    }
};

const createListing = async (req, res) => {
    try {
        const user = await User.findById(req.body.author);

        let imageUrls = [];
        if (req.body.images) {
            imageUrls = req.body.images.split(',').map(url => url.trim()).filter(url => url.length > 0);
        }
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            isForSale: req.body.isForSale,
            propertyType: req.body.propertyType,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            areaSize: req.body.areaSize,
            location: req.body.location,
            images: imageUrls,
            price: req.body.price,
            status: req.body.status,
            author: req.body.author
        }

        const listing = await Listing.create(listingData);
        user.listings.push(listing._id);
        await user.save();
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