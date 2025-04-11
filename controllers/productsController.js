// testing
const dummyProducts = [
    { id: 1, name: 'Afrika', category: 'Adventure', price: 200.00 },
  ];
  
  module.exports = {
    getAllProducts: (req, res) => {
      res.json(dummyProducts);
    },
  
    getProductById: (req, res) => {
      const id = parseInt(req.params.id);
      const product = dummyProducts.find(p => p.id === id);
      product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
    },
  
    searchProducts: (req, res) => {
      const { q } = req.query;
      const results = dummyProducts.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
      res.json(results);
    },
  
    createProduct: (req, res) => {
      const { name, category, price } = req.body;
      const newProduct = {
        id: dummyProducts.length + 1,
        name,
        category,
        price
      };
      dummyProducts.push(newProduct);
      res.status(201).json(newProduct);
    }
  };
  