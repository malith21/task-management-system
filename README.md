![header](https://capsule-render.vercel.app/api?type=waving&color=0:e52d27,100:b31217&height=200&section=header&text=Task%20Management%20System&fontSize=45&fontColor=ffffff&fontAlignY=38&desc=React%20%7C%20Node.js%20%7C%20Express%20%7C%20MySQL&descAlignY=58&descSize=18&animation=fadeIn)

# Task Management System

A full-stack task management application built with React, Node.js, Express, and MySQL.

## 🚀 Features

- **User Authentication** - JWT-based login/logout
- **Dashboard** - View task statistics (Total, Pending, In Progress, Completed, Overdue)
- **Task Management** - Create, Read, Update, Delete tasks
- **Search** - Search tasks by title
- **Filter** - Filter tasks by status and priority
- **Sort** - Sort by newest, oldest, or due date
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for actions
- **Loading States** - Improved user experience

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Bcrypt
- Dotenv

### Database
- MySQL 8.0

## 📁 Project Structure

```
task-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── types/
    ├── .env
    └── package.json
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Environment Variables

#### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin123
DB_NAME=task_management
DB_PORT=3306
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE task_management;
```

2. Run the SQL script:
```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('Low', 'Medium', 'High') NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending',
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Default admin user (password: 123456)
INSERT INTO users (name, email, password) 
VALUES ('Admin', 'admin@test.com', '$2b$10$VrZ9kQZwVYk4RQkR.D1aXOuF.QnZHBHBYQeBZBEVuV.kzYKnKJFuq');
```

### Running the Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

Application runs on: `http://localhost:3000`

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |

### Tasks (Protected - Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/stats | Get task statistics |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Query Parameters for `GET /api/tasks`

| Parameter | Values |
|-----------|--------|
| status | Pending, In Progress, Completed |
| priority | Low, Medium, High |
| search | Search by title |
| sort | newest, oldest, due_date |

---

## 🔐 Default Login Credentials

```
Email:    admin@test.com
Password: 123456
```

---

## 🎯 Assumptions Made

- Only pre-defined users can login (no registration)
- Tasks belong to authenticated users only
- Due date cannot be earlier than today
- All fields are validated on both frontend and backend

---

## ⚠️ Known Limitations

- No pagination (all tasks loaded at once)
- No email notifications
- No file attachments
- No refresh token mechanism

---

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:b31217,100:e52d27&height=100&section=footer)
