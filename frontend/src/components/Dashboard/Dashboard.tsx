import React, { useState, useEffect } from 'react';
import { getTasks, getTaskStats } from '../../services/taskService';

import type { Task, TaskStats, TaskFilters as TaskFiltersType } from '../../types';
import StatsCard from './StatsCard';
import TaskList from '../Tasks/TaskList';
import { toast } from 'react-toastify';
import TaskFiltersComponent from '../Tasks/TaskFilters';
import TaskForm from '../Tasks/TaskForm';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<TaskStats | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<TaskFiltersType>({
        status: '',
        priority: '',
        search: '',
        sort: 'newest',
    });
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { logout } = useAuth();

    const fetchStats = async (): Promise<void> => {
        try {
            const data = await getTaskStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchTasks = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await getTasks(filters);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleDelete = async (taskId: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        try {
            await import('../../services/taskService').then(({ deleteTask }) =>
                deleteTask(taskId)
            );
            toast.success('🗑️ Task deleted successfully!');
            fetchTasks();
            fetchStats();
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('❌ Failed to delete task');
        }
    }
};

    const handleEdit = (task: Task): void => {
        setEditingTask(task);
        setShowTaskForm(true);
    };

    const handleFormSuccess = (): void => {
        setShowTaskForm(false);
        setEditingTask(null);
        fetchTasks();
        fetchStats();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + New Task
                    </button>
                    <button
                        onClick={logout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <StatsCard title="Total" value={stats.total} color="blue" />
                    <StatsCard title="Pending" value={stats.pending} color="yellow" />
                    <StatsCard title="In Progress" value={stats.inProgress} color="purple" />
                    <StatsCard title="Completed" value={stats.completed} color="green" />
                    <StatsCard title="Overdue" value={stats.overdue} color="red" />
                </div>
            )}

            {/* Filters - Component එක use කරන්න */}
            <TaskFiltersComponent filters={filters} setFilters={setFilters} />

            {/* Task List */}
            {loading ? (
                <div className="text-center py-8 text-gray-500">Loading tasks...</div>
            ) : (
                <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    task={editingTask}
                    onClose={() => {
                        setShowTaskForm(false);
                        setEditingTask(null);
                    }}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
};

export default Dashboard;