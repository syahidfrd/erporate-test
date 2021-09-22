const User = require('../models/user');
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

signToken = async user => {
  return JWT.sign(
    {
      _id: user._id
    },
    process.env.JWT_KEY,
    { expiresIn: '24h' }
  );
};

exports.signup = async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(401).json({
        error: 'Email already registered'
      });
    }

    const hash = Bcrypt.hashSync(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hash
    });

    await user.save();

    const token = await signToken(user);

    res.status(200).json({
      message: 'User created',
      token: token
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    const isMatch = await Bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: 'Password not match'
      });
    }

    const token = await signToken(user);

    res.status(200).json({
      message: 'Success login',
      token: token
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
