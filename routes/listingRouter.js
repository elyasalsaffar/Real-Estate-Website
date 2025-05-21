const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing.js');
const listingController = require('../controllers/listingController.js');

router.get('/all', listingController.getAllListings);

// create listing 
router.post('/create', listingController.createListing)

// edit listing 
router.get('/:id/edit', listingController.editListringForm)

// update listing 
router.put('/:id', listingController.updateListing)

//delete listing 
router.delete('/:id', listingController.deleteListing)

module.exports = router;