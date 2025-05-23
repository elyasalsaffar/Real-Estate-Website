const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.post('/listings/:id/comments', commentController.createComment);

module.exports = router;