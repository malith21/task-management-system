import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h1>
                            <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">Name</span>
                                <span className="font-medium text-gray-800">{user?.name || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">Email</span>
                                <span className="font-medium text-gray-800">{user?.email || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-gray-500">User ID</span>
                                <span className="font-medium text-gray-800">#{user?.id || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;