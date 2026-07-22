import React from 'react';

interface StatsCardProps {
    title: string;
    value: number;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color }) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600',
        green: 'bg-green-100 text-green-600',
        red: 'bg-red-100 text-red-600',
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {title}
            </h3>
            <p className={`text-2xl font-bold mt-2 ${colorClasses[color] || 'text-gray-600'}`}>
                {value}
            </p>
        </div>
    );
};

export default StatsCard;