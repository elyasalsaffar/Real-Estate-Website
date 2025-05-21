const User = require('../models/User.js');
const Listing = require('../models/Listing.js');

const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find({ isApproved: true }); // show only approved listings
        res.render('./listings/all.ejs', { listings });
    } catch (error) {
        console.error('An error occurred getting all listings!', error.message);
    }
};

const getAllRequests = async (req, res) => {
    try {
        const pendingListings = await Listing.find({ isApproved: { $in: [null, undefined] } });
        const approvedListings = await Listing.find({ isApproved: true });
        const rejectedListings = await Listing.find({ isApproved: false });

        res.render('./listings/requests.ejs', {
            pendingListings,
            approvedListings,
            rejectedListings,
            user: req.session.user // fix: use session-based user
        });
    } catch (error) {
        console.error('An error occurred getting all request listings!', error.message);
    }
};

const approveListing = async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, { isApproved: true });
        res.redirect('/listings/requests');
    } catch (error) {
        console.error('An error occurred approving a listing!', error.message);
    }
};

const rejectListing = async (req, res) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, { isApproved: false });
        res.redirect('/listings/requests');
    } catch (error) {
        console.error('An error occurred rejecting a listing!', error.message);
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

const getAllRequestListings = async (req, res) => {
    try {
        const listings = await Listing.find({ isApproved: true });
        res.render('./listings/requestsList.ejs', { listings });
    } catch (error) {
        console.error('An error occurred getting requests list!', error.message);
    }
};

module.exports = {
    getAllListings,
    getAllRequests,
    approveListing,
    rejectListing,
    getSingleListing,
    getAllRequestListings
}

const createListing = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        const newListing = new Listing({
            title,
            description,
            price,
            location,
            user: req.session.user._id
        });
        await newListing.save();
        res.redirect('/listings/all');
    } catch (error) {
        console.error('An error occurred creating a listing!', error.message);
    }
};
const editListringForm = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render('./listings/edit.ejs', { listing });
    } catch (error) {
        console.error('An error occurred getting the edit form!', error.message);
    }
};

const updateListing = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        await Listing.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price,
            location
        });
        res.redirect('/listings/all');
    } catch (error) {
        console.error('An error occurred updating a listing!', error.message);
    }
};

const deleteListing = async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.redirect('/listings/all');
    } catch (error) {
        console.error('An error occurred deleting a listing!', error.message);
    }
};
const getUserListings = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate('listings');
        const listings = user.listings;
        res.render('./listings/userListings.ejs', { listings });
    }
    catch (error) {
        console.error('An error occurred getting user listings!', error.message);
    }
}

const getUserListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render('./listings/userListing.ejs', { listing });
    } catch (error) {
        console.error('An error occurred getting user listing!', error.message);
    }
};
const getUserListingEditForm = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.render('./listings/userListingEdit.ejs', { listing });
    } catch (error) {
        console.error('An error occurred getting user listing edit form!', error.message);
    }
};
const updateUserListing = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        await Listing.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price,
            location
        });
        res.redirect('/listings/userListings');
    } catch (error) {
        console.error('An error occurred updating user listing!', error.message);
    }
}

const deleteUserListing = async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.redirect('/listings/userListings');
    } catch (error) {
        console.error('An error occurred deleting user listing!', error.message);
    }
};
module.exports = {
    getAllListings,
    getAllRequests,
    approveListing,
    rejectListing,
    getSingleListing,
    getAllRequestListings,
    createListing,
    editListringForm,
    updateListing,
    deleteListing,
    getUserListings,
    getUserListingById,
    getUserListingEditForm,
    updateUserListing,
    deleteUserListing
}



