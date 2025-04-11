const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// routes
router.get('/', productsController.getAllProducts);
router.get('/search', productsController.searchProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);


module.exports = router;
