const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
} = require('../controllers/taskController');

// All task routes require authentication
router.use(authMiddleware);

router.get('/tasks', getTasks);
router.get('/tasks/stats', getTaskStats);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;