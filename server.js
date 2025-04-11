const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Seed db
const seedDatabase = require('./db/init');
seedDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
