const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============ MIDDLEWARE ============
// Enable CORS for all routes
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ============ ROUTES ============
// Authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Task routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// ============ 404 HANDLER ============
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong! Please try again later.'
    });
});

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation:`);
    console.log(`   POST /api/auth/login - Login`);
    console.log(`   GET  /api/tasks - Get all tasks`);
    console.log(`   GET  /api/tasks/stats - Get statistics`);
    console.log(`   POST /api/tasks - Create task`);
    console.log(`   PUT  /api/tasks/:id - Update task`);
    console.log(`   DELETE /api/tasks/:id - Delete task`);
});