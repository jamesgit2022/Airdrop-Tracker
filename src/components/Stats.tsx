import React from 'react';
import { TrendingUp, Calendar, StickyNote, Clock, Users, TestTube } from 'lucide-react';
import { ActiveTab } from '../types/Task';
import { formatTime } from '../utils/dateUtils';

interface StatsProps {
  activeTab: ActiveTab;
  dailyCompletionRate: number;
  noteCompletionRate: number;
  waitlistCompletionRate: number;
  testnetCompletionRate: number;
  dailyStreak: number;
  noteStreak: number;
  waitlistStreak: number;
  testnetStreak: number;
  timeUntilReset: number;
}

export const Stats: React.FC<StatsProps> = ({
  activeTab,
  dailyCompletionRate,
  noteCompletionRate,
  waitlistCompletionRate,
  testnetCompletionRate,
  dailyStreak,
  noteStreak,
  waitlistStreak,
  testnetStreak,
  timeUntilReset
}) => {
  const getCurrentCompletionRate = () => {
    switch (activeTab) {
      case 'daily': return dailyCompletionRate;
      case 'note': return noteCompletionRate;
      case 'waitlist': return waitlistCompletionRate;
      case 'testnet': return testnetCompletionRate;
      default: return 0;
    }
  };

  const getCurrentStreak = () => {
    switch (activeTab) {
      case 'daily': return dailyStreak;
      case 'note': return noteStreak;
      case 'waitlist': return waitlistStreak;
      case 'testnet': return testnetStreak;
      default: return 0;
    }
  };

  const getTabInfo = () => {
    switch (activeTab) {
      case 'daily': 
        return { icon: Calendar, label: 'Daily', color: 'text-blue-600 dark:text-blue-400' };
      case 'note': 
        return { icon: StickyNote, label: 'Task Only', color: 'text-purple-600 dark:text-purple-400' };
      case 'waitlist': 
        return { icon: Users, label: 'Waitlist', color: 'text-orange-600 dark:text-orange-400' };
      case 'testnet': 
        return { icon: TestTube, label: 'Testnet', color: 'text-green-600 dark:text-green-400' };
      default: 
        return { icon: Calendar, label: 'Unknown', color: 'text-gray-600 dark:text-gray-400' };
    }
  };

  const currentCompletionRate = getCurrentCompletionRate();
  const currentStreak = getCurrentStreak();
  const tabInfo = getTabInfo();
  const TabIcon = tabInfo.icon;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Completion Rate</span>
        </div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          {currentCompletionRate}%
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <TabIcon className={`w-5 h-5 ${tabInfo.color}`} />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {tabInfo.label} Streak
          </span>
        </div>
        <div className={`text-2xl font-bold ${tabInfo.color}`}>
          {currentStreak}
        </div>
      </div>

      {activeTab === 'daily' && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Daily Reset</span>
          </div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {formatTime(timeUntilReset)}
          </div>
        </div>
      )}
    </div>
  );
};