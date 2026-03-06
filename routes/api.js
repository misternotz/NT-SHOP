const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/products', productController.getProductsAPI);
router.get('/products/:id', productController.getProductDetailAPI);

module.exports = router;
