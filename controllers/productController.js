const Product = require('../models/Product');

exports.getIndex = (req, res) => {
  const products = Product.getAll();
  const featured = products.slice(0, 3);
  res.render('index', { page: 'home', products: featured, allProducts: products });
};

exports.getProducts = (req, res) => {
  const category = req.query.category || 'all';
  const search = req.query.search || '';
  
  let filtered = Product.getByCategory(category);
  if (search) {
    filtered = Product.search(search, filtered);
  }
  
  res.render('products', { page: 'products', products: filtered, category, search });
};

exports.getProductDetail = (req, res) => {
  const product = Product.getById(req.params.id);
  if (!product) return res.status(404).render('404', { page: '404' });
  
  const related = Product.getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
    
  res.render('product-detail', { page: 'products', product, related });
};

// API Controllers
exports.getProductsAPI = (req, res) => {
  res.json(Product.getAll());
};

exports.getProductDetailAPI = (req, res) => {
  const product = Product.getById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
};
