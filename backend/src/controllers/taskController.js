const Task = require('../models/Task');

// Get all tasks with filters, search, and sorting
const getTasks = async (req, res) => {
    try {
        const { status, priority, search, sort } = req.query;
        const userId = req.userId;
        
        const tasks = await Task.findAll(userId, { status, priority, search, sort });
        res.json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('Get Tasks Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch tasks' 
        });
    }
};

// Get single task
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        const task = await Task.findById(id, userId);
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: 'Task not found' 
            });
        }
        
        res.json({
            success: true,
            task
        });
    } catch (error) {
        console.error('Get Task Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch task' 
        });
    }
};

// Create task
const createTask = async (req, res) => {
    try {
        const { title, description, priority, status, due_date } = req.body;
        const userId = req.userId;
        
        // Validation
        if (!title) {
            return res.status(400).json({ 
                success: false,
                message: 'Title is required' 
            });
        }
        if (!priority) {
            return res.status(400).json({ 
                success: false,
                message: 'Priority is required' 
            });
        }
        if (!status) {
            return res.status(400).json({ 
                success: false,
                message: 'Status is required' 
            });
        }
        if (!due_date) {
            return res.status(400).json({ 
                success: false,
                message: 'Due date is required' 
            });
        }
        
        // Due date validation
        const today = new Date().setHours(0,0,0,0);
        if (new Date(due_date) < today) {
            return res.status(400).json({ 
                success: false,
                message: 'Due date cannot be earlier than today' 
            });
        }
        
        // Create task
        const taskId = await Task.create({
            title,
            description,
            priority,
            status,
            due_date,
            user_id: userId
        });
        
        const newTask = await Task.findById(taskId, userId);
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error('Create Task Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to create task' 
        });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { title, description, priority, status, due_date } = req.body;
        
        // Check if task exists
        const existingTask = await Task.findById(id, userId);
        if (!existingTask) {
            return res.status(404).json({ 
                success: false,
                message: 'Task not found' 
            });
        }
        
        // Validation
        if (!title) {
            return res.status(400).json({ 
                success: false,
                message: 'Title is required' 
            });
        }
        if (!priority) {
            return res.status(400).json({ 
                success: false,
                message: 'Priority is required' 
            });
        }
        if (!status) {
            return res.status(400).json({ 
                success: false,
                message: 'Status is required' 
            });
        }
        if (!due_date) {
            return res.status(400).json({ 
                success: false,
                message: 'Due date is required' 
            });
        }
        
        // Due date validation
        const today = new Date().setHours(0,0,0,0);
        if (new Date(due_date) < today) {
            return res.status(400).json({ 
                success: false,
                message: 'Due date cannot be earlier than today' 
            });
        }
        
        // Update task
        const updated = await Task.update(id, userId, {
            title,
            description,
            priority,
            status,
            due_date
        });
        
        if (updated) {
            const updatedTask = await Task.findById(id, userId);
            res.json({
                success: true,
                message: 'Task updated successfully',
                task: updatedTask
            });
        } else {
            res.status(400).json({ 
                success: false,
                message: 'Task update failed' 
            });
        }
    } catch (error) {
        console.error('Update Task Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to update task' 
        });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        // Check if task exists
        const existingTask = await Task.findById(id, userId);
        if (!existingTask) {
            return res.status(404).json({ 
                success: false,
                message: 'Task not found' 
            });
        }
        
        const deleted = await Task.delete(id, userId);
        if (deleted) {
            res.json({
                success: true,
                message: 'Task deleted successfully'
            });
        } else {
            res.status(400).json({ 
                success: false,
                message: 'Task deletion failed' 
            });
        }
    } catch (error) {
        console.error('Delete Task Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to delete task' 
        });
    }
};

// Get task statistics
const getTaskStats = async (req, res) => {
    try {
        const userId = req.userId;
        const stats = await Task.getStats(userId);
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch statistics' 
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
};