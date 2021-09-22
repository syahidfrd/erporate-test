const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  wallet: { type: Number, default: 1000000 }
});

UserSchema.set('timestamps', true);

module.exports = mongoose.model('User', UserSchema);
