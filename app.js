const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const apiRoutes = require('./routes/api');
const pageController = require('./controllers/pageController');

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/api', apiRoutes);

// 404
app.use(pageController.get404);

// Start
app.listen(PORT, () => {
  console.log(`🚀 NT SHOP is running on http://localhost:${PORT}`);
});
