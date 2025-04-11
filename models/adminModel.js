const db = require('../db/database');

module.exports = {
    addProduct(product) {
        const stmt = db.prepare(`
            INSERT INTO products (name, description, image_url, price, category_id)
            VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(product.name, product.description, product.image_url, product.price, product.category_id);
        return result;
    },

    updateProduct(productId, updatedFields) {
        const keys = Object.keys(updatedFields);
        const setString = keys.map(key => `${key} = ?`).join(', ');
        const values = keys.map(k => updatedFields[k]);
        values.push(productId);

        const stmt = db.prepare(`
            UPDATE products SET ${setString} WHERE id = ?
        `);
        return stmt.run(...values);
    },

    bulkUpload(productsArray) {
        const stmt = db.prepare(`
            INSERT INTO products (name, description, image_url, price, category_id)
            VALUES (?, ?, ?, ?, ?)
        `);

        const insertMany = db.transaction((products) => {
            for (const product of products) {
                stmt.run(product.name, product.description, product.image_url, product.price, product.category_id);
            }
        });

        insertMany(productsArray);

        return { message: 'Bulk upload successful' };
    }
};
