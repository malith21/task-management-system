// User Types
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
}

// Task Types
export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
    due_date: string;
    created_at: string;
    updated_at: string;
}

export interface TaskStats {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
}

export interface TaskFilters {
    status: string;
    priority: string;
    search: string;
    sort: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
    due_date: string;
}

export interface UpdateTaskData {
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
    due_date: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface TasksResponse {
    success: boolean;
    count: number;
    tasks: Task[];
}

export interface TaskResponse {
    success: boolean;
    task: Task;
}

export interface StatsResponse {
    success: boolean;
    stats: TaskStats;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}