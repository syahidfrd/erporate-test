const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [Object]
});

TransactionSchema.set('timestamps', true);

module.exports = mongoose.model('Transaction', TransactionSchema);
