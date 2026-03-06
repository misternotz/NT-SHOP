const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController');

router.get('/', productController.getIndex);
router.get('/about', pageController.getAbout);
router.get('/contact', pageController.getContact);
router.get('/cart', pageController.getCart);

module.exports = router;
