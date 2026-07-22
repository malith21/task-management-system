import api from './api';
import { Task, TaskStats, CreateTaskData, UpdateTaskData, TaskFilters } from '../types';

// Get all tasks with filters
export const getTasks = async (filters: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data.tasks;
};

// Get task statistics
export const getTaskStats = async (): Promise<TaskStats> => {
    const response = await api.get('/tasks/stats');
    return response.data.stats;
};

// Get single task
export const getTask = async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.task;
};

// Create task
export const createTask = async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data.task;
};

// Update task
export const updateTask = async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.task;
};

// Delete task
export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};