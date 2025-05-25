const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const listingRouter = require('./routes/listingRouter.js');
const commentRouter = require('./routes/commentRouter.js');

const PORT = process.env.PORT ? process.env.PORT : 3000;

const db = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static('public'));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    res.locals.loggedInUserId = req.session.user._id;
    next();
  } else {
    res.redirect('/auth/sign-in');
  }
};

app.get('/listings/new', requireAuth, (req, res) => {
  res.render('./listings/new.ejs', { user: { _id: res.locals.loggedInUserId } });
});

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/listings', listingRouter);

app.get('/about-us', (req, res) => {
  res.render('about-us');
});

app.get('/contact-us', (req, res) => {
  res.render('contact-us');
});

app.use('/', commentRouter);

app.get('/', async (req, res) => {
  try {
    const Listing = require('./models/Listing.js');
    const listings = await Listing.find({ isApproved: true });
    res.render('index.ejs', { listings });
  } catch (error) {
    console.error('An error occurred getting listings for homepage', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
});