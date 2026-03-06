const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

// Base prefix: /admin
router.use(isAdmin); // Ensure all routes in this file are protected by isAdmin

// Dashboard
router.get('/', adminController.getDashboard);

// Products CRUD
router.get('/products', adminController.getProducts);
router.get('/products/new', adminController.getNewProduct);
router.post('/products', adminController.createProduct);
router.get('/products/:id/edit', adminController.getEditProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Users Management
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
