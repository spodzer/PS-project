const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// routes
router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.editProduct);
router.post('/products/bulk', adminController.bulkUpload);

module.exports = router;
