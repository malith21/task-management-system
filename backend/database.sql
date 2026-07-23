-- ==========================================
-- DATABASE CREATE
-- ==========================================
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- ==========================================
-- USERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- TASKS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    status ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending',
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- DEFAULT ADMIN USER (password: 123456)
-- ==========================================
INSERT INTO users (name, email, password) 
VALUES ('Admin', 'admin@test.com', '$2b$10$VrZ9kQZwVYk4RQkR.D1aXOuF.QnZHBHBYQeBZBEVuV.kzYKnKJFuq');

-- ==========================================
-- SAMPLE TASKS
-- ==========================================
INSERT INTO tasks (user_id, title, description, priority, status, due_date) VALUES
(1, 'Complete project proposal', 'Write the project proposal document for client', 'High', 'Pending', DATE_ADD(CURDATE(), INTERVAL 3 DAY)),
(1, 'Review code changes', 'Review pull requests from team members', 'Medium', 'In Progress', DATE_ADD(CURDATE(), INTERVAL 1 DAY)),
(1, 'Update documentation', 'Update API documentation with new endpoints', 'Low', 'Completed', DATE_SUB(CURDATE(), INTERVAL 1 DAY));

-- ==========================================
-- VERIFY
-- ==========================================
SELECT * FROM users;
SELECT * FROM tasks;