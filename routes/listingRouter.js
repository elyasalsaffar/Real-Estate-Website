const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing.js');
const listingController = require('../controllers/listingController.js');

router.get('/all', listingController.getAllListings);

router.get('/requests', listingController.getAllRequests);

router.post('/requests/:id/approve', listingController.approveListing);

router.post('/requests/:id/reject', listingController.rejectListing);

router.get('/requestsList/:id', listingController.getAllRequestListings);

router.get('/:id', listingController.getSingleListing);

module.exports = router;