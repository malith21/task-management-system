const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    // Find user by email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // Create new user
    static async create(userData) {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    }

    // Validate password
    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Get user by ID
    static async findById(id) {
        const [rows] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;