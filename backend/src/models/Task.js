const db = require('../config/database');

class Task {
    // Get all tasks with filters
    static async findAll(userId, filters = {}) {
        let query = 'SELECT * FROM tasks WHERE user_id = ?';
        const params = [userId];
        
        // Status filter
        if (filters.status && filters.status !== '') {
            query += ' AND status = ?';
            params.push(filters.status);
        }
        
        // Priority filter
        if (filters.priority && filters.priority !== '') {
            query += ' AND priority = ?';
            params.push(filters.priority);
        }
        
        // Search by title
        if (filters.search && filters.search !== '') {
            query += ' AND title LIKE ?';
            params.push(`%${filters.search}%`);
        }
        
        // Sorting
        if (filters.sort) {
            switch(filters.sort) {
                case 'newest':
                    query += ' ORDER BY created_at DESC';
                    break;
                case 'oldest':
                    query += ' ORDER BY created_at ASC';
                    break;
                case 'due_date':
                    query += ' ORDER BY due_date ASC';
                    break;
                default:
                    query += ' ORDER BY created_at DESC';
            }
        } else {
            query += ' ORDER BY created_at DESC';
        }
        
        const [rows] = await db.query(query, params);
        return rows;
    }

    // Get single task by ID
    static async findById(id, userId) {
        const [rows] = await db.query(
            'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return rows[0];
    }

    // Create new task
    static async create(taskData) {
        const { title, description, priority, status, due_date, user_id } = taskData;
        const [result] = await db.query(
            `INSERT INTO tasks (title, description, priority, status, due_date, user_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description || null, priority, status, due_date, user_id]
        );
        return result.insertId;
    }

    // Update task
    static async update(id, userId, taskData) {
        const { title, description, priority, status, due_date } = taskData;
        const [result] = await db.query(
            `UPDATE tasks 
             SET title = ?, description = ?, priority = ?, status = ?, due_date = ? 
             WHERE id = ? AND user_id = ?`,
            [title, description || null, priority, status, due_date, id, userId]
        );
        return result.affectedRows > 0;
    }

    // Delete task
    static async delete(id, userId) {
        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }

    // Get task statistics
    static async getStats(userId) {
        const [rows] = await db.query(
            `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgress,
                SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN due_date < CURDATE() AND status != 'Completed' THEN 1 ELSE 0 END) as overdue
             FROM tasks 
             WHERE user_id = ?`,
            [userId]
        );
        return rows[0];
    }
}

module.exports = Task;