const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing.js');
const listingController = require('../controllers/listingController.js');

router.get('/', listingController.getAllListings);


module.exports = router;