import React, { useState } from 'react';
import { CheckSquare, Menu, X, Settings, TrendingUp, Calendar, Clock, StickyNote, Users, TestTube } from 'lucide-react';
import { formatTime } from '../utils/dateUtils';

interface MobileNavbarProps {
  onOpenSettings: () => void;
  dailyCompletionRate: number;
  dailyStreak: number;
  timeUntilReset: number;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ 
  onOpenSettings, 
  dailyCompletionRate, 
  dailyStreak, 
  timeUntilReset 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSettingsClick = () => {
    onOpenSettings();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <CheckSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Task Tracker</h1>
          </div>
          
          {/* Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Subtitle */}
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Stay organized with all your tasks</p>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMenu}>
          <div 
            className="absolute top-0 right-0 bg-white dark:bg-gray-800 h-full w-80 shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Stats Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Stats Overview</h3>
              
              <div className="space-y-3">
                {/* Completion Rate */}
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Completion</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tasks completed today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{dailyCompletionRate}%</p>
                  </div>
                </div>

                {/* Daily Streak */}
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Streak</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Completed tasks today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{dailyStreak}</p>
                  </div>
                </div>

                {/* Daily Reset Timer */}
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Reset</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Time until reset</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400 font-mono">
                      {formatTime(timeUntilReset)}
                    </p>
                  </div>
                </div>

                {/* Task Types Overview */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <StickyNote className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-purple-700 dark:text-purple-300">Task Only</p>
                  </div>
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <Users className="w-4 h-4 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-orange-700 dark:text-orange-300">Waitlist</p>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-center col-span-2">
                    <TestTube className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-xs font-medium text-green-700 dark:text-green-300">Testnet Tasks</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Actions</h3>
              
              <button
                onClick={handleSettingsClick}
                className="w-full flex items-center gap-3 p-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage app preferences</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};