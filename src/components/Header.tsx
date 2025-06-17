import React from 'react';
import { CheckSquare, Settings } from 'lucide-react';
import { MobileNavbar } from './MobileNavbar';

interface HeaderProps {
  onOpenSettings: () => void;
  dailyCompletionRate: number;
  dailyStreak: number;
  timeUntilReset: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSettings, 
  dailyCompletionRate, 
  dailyStreak, 
  timeUntilReset 
}) => {
  return (
    <>
      {/* Mobile Navbar */}
      <MobileNavbar 
        onOpenSettings={onOpenSettings}
        dailyCompletionRate={dailyCompletionRate}
        dailyStreak={dailyStreak}
        timeUntilReset={timeUntilReset}
      />
      
      {/* Desktop Header */}
      <div className="hidden md:block mb-8">
        <div className="flex items-center justify-between mb-2">
          {/* Left spacer for visual balance */}
          <div className="w-8"></div>
          
          {/* Center content */}
          <div className="flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Airdrop Tracker</h1>
          </div>
          
          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-center">Stay organized with your daily tasks and testnet task only.</p>
      </div>
    </>
  );
};