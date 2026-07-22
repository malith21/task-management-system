import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Task Management</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">{user?.name}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// මෙය add කරන්න - isolatedModules error එක fix කිරීමට
export {};