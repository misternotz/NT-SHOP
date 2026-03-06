const Product = require('../models/Product');
const User = require('../models/User');

// --- Dashboard ---
exports.getDashboard = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      path: '/admin',
      productCount,
      userCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// --- Product Management ---
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products/index', {
      title: 'Manage Products',
      path: '/admin/products',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getNewProduct = (req, res) => {
  res.render('admin/products/form', {
    title: 'Add New Product',
    path: '/admin/products/new',
    product: {} // Empty product object for new form
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      stock
    });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products/new');
  }
};

exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/admin/products');
    res.render('admin/products/form', {
      title: 'Edit Product',
      path: `/admin/products/${product._id}/edit`,
      product
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      imageUrl,
      category,
      stock
    });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/products');
  }
};

// --- User Management ---
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.render('admin/users/index', {
      title: 'Manage Users',
      path: '/admin/users',
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (req.params.id === req.session.user.id) {
       // Prevent admin from demoting themselves
       return res.redirect('/admin/users');
    }
    await User.findByIdAndUpdate(req.params.id, { role });
    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/users');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.session.user.id) {
       // Prevent admin from deleting themselves
       return res.redirect('/admin/users');
    }
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/users');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/users');
  }
};
