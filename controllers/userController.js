const User = require('../models/User');

const getUserById = async (req, res) => {
  if (!req.session.user || req.session.user._id !== req.params.id) {
    return res.status(403).send('Unauthorized');
  }
  try {
    const user = await User.findById(req.params.id).populate('listings');
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('users/profile', { user });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { getUserById };
