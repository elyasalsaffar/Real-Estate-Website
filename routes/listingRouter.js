const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing.js');
const listingController = require('../controllers/listingController.js');

router.get('/all', listingController.getAllListings);

router.get('/requests', listingController.getAllRequests);

router.get('/requestsList/:id', listingController.getAllRequestListings);

router.get('/:id', listingController.getSingleListing);

module.exports = router;