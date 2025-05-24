const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { first, last, email, password, confirmPassword, picture } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render('auth/sign-up.ejs', { error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('auth/sign-up.ejs', { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      first,
      last,
      email,
      password: hashedPassword,
      picture,
      role: 'user'
    });

    await user.save();
    res.redirect('/auth/sign-in');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Sign in user
exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).render('auth/sign-in.ejs', { error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).render('auth/sign-in.ejs', { error: 'Invalid email or password' });
    }

    // Save user info in session (excluding password)
    req.session.user = {
      _id: user._id,
      first: user.first,
      last: user.last,
      email: user.email,
      role: user.role,
    };

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Sign out user
exports.signUserOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Could not log out');
    }
    res.redirect('/');
  });
};

// Show update password form
exports.showUpdatePasswordForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/sign-in');
  }
  res.render('auth/update-password.ejs', { user: req.session.user });
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

    res.render('auth/confirm-password-update.ejs', { user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
