const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    // redirect to your sign-in route path (matches your authRouter)
    return res.redirect('/auth/sign-in');
  }
  next();
}

// Profile page route
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const listings = await Listing.find({ user: user._id });

    res.render('users/profile', { user, listings });  // fix: render from users folder for clarity
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
