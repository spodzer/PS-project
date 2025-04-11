const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to execute SQL from a file
function runSqlFile(filename) {
    const sqlPath = path.join(__dirname, '..', 'sql', filename);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    db.exec(sql, (err) => {
        if (err) {
            console.error(`Error executing SQL file: ${filename}`, err);
        } else {
            console.log(`Successfully ran SQL file: ${filename}`);
        }
    });
}
 
// Function to initialize the database
function initializeDatabase() {
    console.log('Initializing database...');

    // Drop existing tables if they exist
    runSqlFile('drop_tables.sql');     

    // Create tables
    runSqlFile('create_tables.sql');

    // Insert sample data
    runSqlFile('insert_categories.sql');

    // Insert sample data
    runSqlFile('insert_products.sql');

    console.log('Database initialization complete.');
}

// Export the database object and the initialization function
module.exports = {
    db,
    initializeDatabase
};
