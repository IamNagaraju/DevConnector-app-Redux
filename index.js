const express = require('express');
const { mongoose } = require('./config/db');
const { router } = require('./config/routes');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(morgan('dev'));

app.use('/api', router);

//Server static assests if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('listing to port number ', port);
});
