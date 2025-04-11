const db = require('../db');

function getAllProducts() {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all();
}

function getProductsByCategory(categoryId) {
    const stmt = db.prepare('SELECT * FROM products WHERE category_id = ?');
    return stmt.all(categoryId);
}

function getProductById(id) {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    return stmt.get(id);
}

function searchProducts(query) {
    const stmt = db.prepare('SELECT * FROM products WHERE name LIKE ?');
    return stmt.all(`%${query}%`);
}

function addProduct(product) {
    const stmt = db.prepare(`
        INSERT INTO products (name, description, image_url, price, category_id)
        VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        product.name,
        product.description,
        product.image_url,
        product.price,
        product.category_id
    );
    return result.lastInsertRowid;
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    searchProducts,
    addProduct
};
