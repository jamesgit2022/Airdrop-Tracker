import React, { useState } from 'react';
import { Settings, X, Download, Upload, Clock, Save, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  currentResetHour: number;
  currentResetMinute: number;
  onSaveResetTime: (hour: number, minute: number) => void;
  onExportData: () => void;
  onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  currentResetHour,
  currentResetMinute,
  onSaveResetTime,
  onExportData,
  onImportData
}) => {
  const [resetHour, setResetHour] = useState(currentResetHour);
  const [resetMinute, setResetMinute] = useState(currentResetMinute);
  const { setTheme } = useTheme();

  if (!isOpen) return null;

  const handleSaveResetTime = () => {
    onSaveResetTime(resetHour, resetMinute);
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Theme</h4>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Choose your preferred theme appearance
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Sun className="w-5 h-5 text-yellow-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Light</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Moon className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Dark</span>
              </button>
              
              <button
                onClick={() => {
                  // Remove saved theme to use system preference
                  localStorage.removeItem('task-tracker-theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  setTheme(systemTheme);
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  !localStorage.getItem('task-tracker-theme')
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <Monitor className="w-5 h-5 text-gray-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">System</span>
              </button>
            </div>
          </div>
        </div>
        {/* Daily Reset Time Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Daily Reset Time</h4>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Set when your daily tasks should reset. Current time: {formatTime(currentResetHour, currentResetMinute)}
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hour (0-23)
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={resetHour}
                  onChange={(e) => setResetHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minute (0-59)
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={resetMinute}
                  onChange={(e) => setResetMinute(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <button
              onClick={handleSaveResetTime}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Save Reset Time
            </button>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Data Management</h4>
          
          <div className="space-y-3">
            <button
              onClick={onExportData}
              className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-800 dark:text-gray-200">Export Data</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Download all your tasks as a JSON file
                </div>
              </div>
            </button>

            <label className="w-full flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-800 dark:text-gray-200">Import Data</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Upload a previously exported JSON file
                </div>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={onImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5">⚠️</div>
            <div>
              <div className="font-medium text-yellow-800 dark:text-yellow-300 text-sm">Important Notes</div>
              <ul className="text-yellow-700 dark:text-yellow-400 text-xs mt-1 space-y-1">
                <li>• Importing data will replace all current tasks</li>
                <li>• Make sure to export your data before importing</li>
                <li>• Reset time changes take effect immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};