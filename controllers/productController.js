const Product = require('../models/Product');

exports.getIndex = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const featured = products.slice(0, 3);
    res.render('index', { page: 'home', products: featured, allProducts: products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const category = req.query.category || 'all';
    const search = req.query.search || '';
    
    let query = {};
    if (category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const filtered = await Product.find(query).sort({ createdAt: -1 });
    res.render('products', { page: 'products', products: filtered, category, search });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).render('404', { page: '404' });
    
    const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(3);
      
    res.render('product-detail', { page: 'products', product, related });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// API Controllers
exports.getProductsAPI = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductDetailAPI = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
