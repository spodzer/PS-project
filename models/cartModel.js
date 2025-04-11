const db = require('../db/database');

module.exports = {
    getCartItemsByUserId(userId) {
        const stmt = db.prepare(`
            SELECT cp.id, p.name, p.price, cp.quantity, p.image_url
            FROM cart_products cp
            JOIN carts c ON cp.cart_id = c.id
            JOIN products p ON cp.game_id = p.id
            WHERE c.user_id = ? AND c.status = 'idle'
        `);
        return stmt.all(userId);
    },

    addToCart(userId, gameId, quantity) {
        const cart = db.prepare(`
            SELECT id FROM carts WHERE user_id = ? AND status = 'idle'
        `).get(userId);

        const cartId = cart ? cart.id : db.prepare(`
            INSERT INTO carts (user_id, status) VALUES (?, 'idle')
        `).run(userId).lastInsertRowid;

        const existing = db.prepare(`
            SELECT id, quantity FROM cart_products WHERE cart_id = ? AND game_id = ?
        `).get(cartId, gameId);

        if (existing) {
            db.prepare(`
                UPDATE cart_products SET quantity = quantity + ? WHERE id = ?
            `).run(quantity, existing.id);
        } else {
            db.prepare(`
                INSERT INTO cart_products (cart_id, game_id, quantity)
                VALUES (?, ?, ?)
            `).run(cartId, gameId, quantity);
        }

        return { message: 'Item added to cart' };
    },

    removeFromCart(cartProductId) {
        return db.prepare(`
            DELETE FROM cart_products WHERE id = ?
        `).run(cartProductId);
    },

    checkout(userId) {
        const cart = db.prepare(`
            SELECT id FROM carts WHERE user_id = ? AND status = 'idle'
        `).get(userId);

        if (!cart) return { message: 'No active cart to checkout' };

        db.prepare(`
            UPDATE carts SET status = 'purchased' WHERE id = ?
        `).run(cart.id);

        return { message: 'Checkout complete' };
    }
};
