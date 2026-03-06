require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files & Middleware
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'nt_secret_key_123',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Global user variable for templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// ─── Routes ────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const pageController = require('./controllers/pageController');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/api', apiRoutes);

// 404
app.use(pageController.get404);

// Start
app.listen(PORT, () => {
  console.log(`🚀 NT SHOP is running on http://localhost:${PORT}`);
});
