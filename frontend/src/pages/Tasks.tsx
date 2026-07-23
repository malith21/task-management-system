import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import type { Task, TaskFilters as TaskFiltersType } from '../types';
import Navbar from '../components/common/Navbar';
import TaskList from '../components/Tasks/TaskList';
import TaskFiltersComponent from '../components/Tasks/TaskFilters';
import TaskForm from '../components/Tasks/TaskForm';

const Tasks: React.FC = () => {
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
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleDelete = async (taskId: number): Promise<void> => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await import('../services/taskService').then(({ deleteTask }) =>
                    deleteTask(taskId)
                );
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
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
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
                        <p className="text-gray-500 text-sm">Manage all your tasks</p>
                    </div>
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Task
                    </button>
                </div>

                {/* Filters */}
                <TaskFiltersComponent filters={filters} setFilters={setFilters} />

                {/* Task List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3 text-gray-500">
                            <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading tasks...
                        </div>
                    </div>
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
        </div>
    );
};

export default Tasks;