// test
let cart = {
    userId: 1,
    items: [
      { gameId: 1, name: 'Afrika', quantity: 1, price: 200.00 },
    ]
  };
  
  module.exports = {
    getCart: (req, res) => {
      res.json(cart);
    },
  
    addToCart: (req, res) => {
      const { gameId, name, quantity, price } = req.body;
      cart.items.push({ gameId, name, quantity, price });
      res.status(201).json({ message: 'Game added to cart', cart: cart });
    },
  
    removeFromCart: (req, res) => {
      const gameId = parseInt(req.params.gameId);
      cart.items = cart.items.filter(item => item.gameId !== gameId);
      res.json({ message: 'Game removed from cart', cart: cart });
    },
  
    checkoutCart: (req, res) => {
      cart.items = [];
      res.json({ message: 'Checkout successful. Cart is now empty.' });
    }
  };
  