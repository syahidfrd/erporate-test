const Transaction = require('../models/transaction');
const Product = require('../models/product');
const User = require('../models/user');

exports.create = async (req, res) => {
  try {
    const products = req.body.product;
    const userId = req.user._id;
    let totalPrice = 0;

    const user = await User.findById(userId);
    await Promise.all(
      products.map(async (val, i) => {
        totalPrice += val.quantity * val.price;
      })
    );

    if (user.wallet < totalPrice) {
      return res.status(401).json({
        error: 'Insufficient wallet funds'
      });
    }

    const transaction = new Transaction({
      _user: userId,
      products: products
    });
    await transaction.save();

    await Promise.all(
      products.map(async (val, i) => {
        const product = await Product.findById(val.id);
        const currentStock = product.stock - val.quantity;
        await Product.updateOne({ _id: val.id }, { stock: currentStock });
      })
    );

    const currentWallet = user.wallet - totalPrice;
    await User.updateOne({ _id: userId }, { wallet: currentWallet });

    res.status(200).json({
      message: 'Success'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const transaction = await Transaction.find().populate('_user');
    res.status(200).json({
      message: 'Data transaction',
      data: transaction,
      length: transaction.length
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
