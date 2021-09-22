const User = require('../models/user');

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(401).json({
        error: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User by id',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
