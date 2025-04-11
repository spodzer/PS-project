const fs = require('fs');
const path = require('path');
const db = require('./database');

function seedDatabase() {
    const dropSQL = fs.readFileSync(path.join(__dirname, 'drop_tables.sql'), 'utf8');
    const createSQL = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');
    const insertCategories = fs.readFileSync(path.join(__dirname, 'insert_categories.sql'), 'utf8');
    const insertProducts = fs.readFileSync(path.join(__dirname, 'insert_products.sql'), 'utf8');

    db.exec(dropSQL);
    db.exec(createSQL);
    db.exec(insertCategories);
    db.exec(insertProducts);

    console.log('Database seeded!');
}

module.exports = seedDatabase;
