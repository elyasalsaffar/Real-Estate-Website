const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController.js');

// View all approved listings
router.get('/all', listingController.getAllListings);

// Admin request routes
router.get('/requests', listingController.getAllRequests);
router.post('/requests/:id/approve', listingController.approveListing);
router.post('/requests/:id/reject', listingController.rejectListing);
router.get('/requestsList', listingController.getAllRequestListings); // fixed path, removed :id

// CRUD routes
router.post('/create', listingController.createListing);
router.get('/:id/edit', listingController.editListringForm);
router.put('/:id', listingController.updateListing);
router.delete('/:id', listingController.deleteListing);

// View one listing 
router.get('/:id', listingController.getSingleListing);

module.exports = router;

