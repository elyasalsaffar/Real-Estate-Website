const User = require('../models/User.js');
const Listing = require('../models/Listing.js');

// View all approved listings
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({ isApproved: true });
    res.render('./listings/all.ejs', { listings });
  } catch (error) {
    console.error('Error getting all listings:', error.message);
    res.status(500).send('Server Error');
  }
};

// Admin - View all request statuses
const getAllRequests = async (req, res) => {
  try {
    const pendingListings = await Listing.find({ isApproved: { $in: [null, undefined] } });
    const approvedListings = await Listing.find({ isApproved: true });
    const rejectedListings = await Listing.find({ isApproved: false });

    res.render('./listings/requests.ejs', {
      pendingListings,
      approvedListings,
      rejectedListings,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error getting listing requests:', error.message);
    res.status(500).send('Server Error');
  }
};

// Approve listing
const approveListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.redirect('/listings/requests');
  } catch (error) {
    console.error('Error approving listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// Reject listing
const rejectListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { isApproved: false });
    res.redirect('/listings/requests');
  } catch (error) {
    console.error('Error rejecting listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// Show one listing
const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render('./listings/show.ejs', { listing });
  } catch (error) {
    console.error('Error getting single listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// Admin - View all approved
const getAllRequestListings = async (req, res) => {
  try {
    const listings = await Listing.find({ isApproved: true });
    res.render('./listings/requestsList.ejs', { listings });
  } catch (error) {
    console.error('Error getting request listings:', error.message);
    res.status(500).send('Server Error');
  }
};

// Create listing
const createListing = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send('Unauthorized: Please sign in first.');
    }

    const { title, description, price, location, areaSize, images, propertyType, bedrooms, bathrooms, status, isForSale } = req.body;

    const listing = new Listing({
      title,
      description,
      price,
      location,
      areaSize,
      images: Array.isArray(images) ? images : [images],
      propertyType,
      bedrooms,
      bathrooms,
      status: status || 'pending',
      isForSale,
      user: req.session.user._id
    });

    await listing.save();
    res.redirect('/listings/all');
  } catch (error) {
    console.error('Error creating listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// Edit form
const editListringForm = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render('./listings/edit.ejs', { listing });
  } catch (error) {
    console.error('Error loading edit form:', error.message);
    res.status(500).send('Server Error');
  }
};

// Update listing
const updateListing = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    await Listing.findByIdAndUpdate(req.params.id, { title, description, price, location });
    res.redirect('/listings/all');
  } catch (error) {
    console.error('Error updating listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// Delete listing
const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listings/all');
  } catch (error) {
    console.error('Error deleting listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// User's listings
const getUserListings = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate('listings');
    res.render('./listings/userListings.ejs', { listings: user.listings });
  } catch (error) {
    console.error('Error getting user listings:', error.message);
    res.status(500).send('Server Error');
  }
};

const getUserListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render('./listings/userListing.ejs', { listing });
  } catch (error) {
    console.error('Error getting user listing by ID:', error.message);
    res.status(500).send('Server Error');
  }
};

const getUserListingEditForm = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.render('./listings/userListingEdit.ejs', { listing });
  } catch (error) {
    console.error('Error loading user listing edit form:', error.message);
    res.status(500).send('Server Error');
  }
};

const updateUserListing = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    await Listing.findByIdAndUpdate(req.params.id, { title, description, price, location });
    res.redirect('/listings/userListings');
  } catch (error) {
    console.error('Error updating user listing:', error.message);
    res.status(500).send('Server Error');
  }
};

const deleteUserListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listings/userListings');
  } catch (error) {
    console.error('Error deleting user listing:', error.message);
    res.status(500).send('Server Error');
  }
};

// ✅ Export all properly
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
};
