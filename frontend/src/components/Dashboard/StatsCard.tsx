import React from 'react';

interface StatsCardProps {
    title: string;
    value: number;
    color: string;
    icon: string;  // ← මෙය Add කරන්න
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, icon }) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 border-blue-200 text-blue-600',
        yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
        purple: 'bg-purple-50 border-purple-200 text-purple-600',
        green: 'bg-green-50 border-green-200 text-green-600',
        red: 'bg-red-50 border-red-200 text-red-600',
    };

    return (
        <div className={`rounded-xl border p-4 ${colorClasses[color]} transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between">
                <span className="text-2xl">{icon}</span>
                <span className="text-2xl font-bold">{value}</span>
            </div>
            <p className="text-sm font-medium mt-1">{title}</p>
        </div>
    );
};

export default StatsCard;