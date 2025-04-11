// test
let adminProducts = [
    { id: 1, name: 'Def Jam: FFNY', description: 'Fighting game', price: 200.00 },
  ];
  
  let nextId = 2;
  
  module.exports = {
    addProduct: (req, res) => {
      const { name, description, price } = req.body;
      const newProduct = { id: nextId++, name, description, price };
      adminProducts
    .push(newProduct);
      res.status(201).json({ message: 'Product added', product: newProduct });
    },
  
    editProduct: (req, res) => {
      const productId = parseInt(req.params.id);
      const { name, description, price } = req.body;
      const product = adminProducts
    .find(p => p.id === productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
  
      res.json({ message: 'Product updated', product });
    },
  
    bulkUpload: (req, res) => {
      const { products } = req.body;
  
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Invalid format' });
      }
  
      products.forEach(product => {
        adminProducts
    .push({ id: nextId++, ...product });
      });
  
      res.status(201).json({ message: 'Bulk upload successful', added: products.length });
    }
  };
  