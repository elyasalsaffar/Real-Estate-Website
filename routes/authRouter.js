const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Render sign-up and sign-in pages
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs', { error: null });
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs', { error: null });
});

// Handle registration and login
router.post('/sign-up', authController.registerUser);
router.post('/sign-in', authController.signInUser);

// Sign out route
router.get('/sign-out', authController.signUserOut);

// Password update routes
router.get('/:id/update-password', authController.showUpdatePasswordForm);
router.put('/:id', authController.updatePassword);

module.exports = router;
