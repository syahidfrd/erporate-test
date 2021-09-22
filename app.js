const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Routing
 */
app.use('/product', require('./routes/product'));
app.use('/auth', require('./routes/auth'));
app.use('/transaction', require('./routes/transaction'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => {
  res.send('REST API technicaltest-server');
});

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
