const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const logger = require('morgan');
require('dotenv').config();

const db = require('./db'); // DB connection

const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');  // ADD THIS

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static('public'));

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);  // MOUNT USER ROUTER HERE

app.get('/', (req, res) => {
  res.render('index');
});

// Start server after DB connects
db.once('open', () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// DB error handling
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
