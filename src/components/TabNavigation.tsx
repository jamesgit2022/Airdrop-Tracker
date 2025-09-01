import React from 'react';
import { Calendar, StickyNote, Users, TestTube, Share2 } from 'lucide-react';
import { ActiveTab } from '../types/Task';

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  dailyCount: number;
  noteCount: number;
  waitlistCount: number;
  testnetCount: number;
  socialLinksCount: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  dailyCount,
  noteCount,
  waitlistCount,
  testnetCount
  socialLinksCount
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6 gap-1">
      <button
        onClick={() => onTabChange('daily')}
        className={`flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-md font-medium transition-all text-sm ${
          activeTab === 'daily'
            ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <Calendar className="w-4 h-4" />
        <span className="hidden sm:inline">Daily</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
          {dailyCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('note')}
        className={`flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-md font-medium transition-all text-sm ${
          activeTab === 'note'
            ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <StickyNote className="w-4 h-4" />
        <span className="hidden sm:inline">Task Only</span>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
          {noteCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('waitlist')}
        className={`flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-md font-medium transition-all text-sm ${
          activeTab === 'waitlist'
            ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">Waitlist</span>
        <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 text-xs px-2 py-1 rounded-full">
          {waitlistCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('testnet')}
        className={`flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-md font-medium transition-all text-sm ${
          activeTab === 'testnet'
            ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <TestTube className="w-4 h-4" />
        <span className="hidden sm:inline">Testnet</span>
        <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
          {testnetCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('social_links')}
        className={`flex items-center justify-center gap-2 py-3 px-2 md:px-4 rounded-md font-medium transition-all text-sm ${
          activeTab === 'social_links'
            ? 'bg-white dark:bg-gray-600 text-pink-600 dark:text-pink-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Social</span>
        <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 text-xs px-2 py-1 rounded-full">
          {socialLinksCount}
        </span>
      </button>
    </div>
  );
};