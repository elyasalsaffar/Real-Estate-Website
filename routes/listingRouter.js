const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController.js');
const Listing = require('../models/Listing.js'); // Needed for admin routes

// 🔐 Admin middleware to check if user is an admin
function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Access Denied');
  }
  next();
}

// ✅ View all approved listings
router.get('/all', listingController.getAllListings);

// ✅ Create a new listing
router.post('/create', listingController.createListing);

// ✅ Edit + Update listing
router.get('/:id/edit', listingController.editListringForm);
router.put('/:id', listingController.updateListing);

// ✅ Delete listing
router.delete('/:id', listingController.deleteListing);

// ✅ View single listing
router.get('/:id', listingController.getSingleListing);

// ✅ Admin request routes (View & Handle Pending Listings)
router.get('/requests', isAdmin, listingController.getAllRequests);
router.post('/requests/:id/approve', isAdmin, listingController.approveListing);
router.post('/requests/:id/reject', isAdmin, listingController.rejectListing);

// ✅ (Optional) Request Listing View (for Admin)
router.get('/requestsList', isAdmin, listingController.getAllRequestListings);

// You can delete or keep only one form.

module.exports = router;
