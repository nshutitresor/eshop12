const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json({
//   extended: false
// }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/braintree', require('./routes/api/braintree'));
app.use('/api/order', require('./routes/api/order'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));