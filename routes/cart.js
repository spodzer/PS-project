const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// routes
router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:gameId', cartController.removeFromCart);
router.post('/checkout', cartController.checkoutCart);

module.exports = router;
