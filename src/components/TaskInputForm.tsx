import React from 'react';
import { Plus, Calendar, StickyNote, FileText, X, Link as LinkIcon, Users, TestTube } from 'lucide-react';
import { TaskType, TaskStatus } from '../types/Task';

interface TaskInputFormProps {
  newTask: string;
  newTaskType: TaskType;
  newTaskStatus: TaskStatus;
  newTaskLink: string;
  newTaskDescription: string;
  onTaskChange: (value: string) => void;
  onTaskTypeChange: (type: TaskType) => void;
  onTaskStatusChange: (status: TaskStatus) => void;
  onTaskLinkChange: (value: string) => void;
  onTaskDescriptionChange: (value: string) => void;
  onAddTask: () => void;
  onClose: () => void;
}

export const TaskInputForm: React.FC<TaskInputFormProps> = ({
  newTask,
  newTaskType,
  newTaskStatus,
  newTaskLink,
  newTaskDescription,
  onTaskChange,
  onTaskTypeChange,
  onTaskStatusChange,
  onTaskLinkChange,
  onTaskDescriptionChange,
  onAddTask,
  onClose,
}) => {
  const isValidUrl = (url: string) => {
    if (!url.trim()) return true; // Empty URL is valid
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add New Task</h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Task Title *
        </label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => onTaskChange(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      {/* Task Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Task Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 gap-1">
          <button
            type="button"
            onClick={() => onTaskTypeChange(TaskType.DAILY)}
            className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-all justify-center ${
              newTaskType === TaskType.DAILY
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Daily
          </button>
          <button
            type="button"
            onClick={() => onTaskTypeChange(TaskType.NOTE)}
            className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-all justify-center ${
              newTaskType === TaskType.NOTE
                ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <StickyNote className="w-4 h-4" />
            Task Only
          </button>
          <button
            type="button"
            onClick={() => onTaskTypeChange(TaskType.WAITLIST)}
            className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-all justify-center ${
              newTaskType === TaskType.WAITLIST
                ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Waitlist
          </button>
          <button
            type="button"
            onClick={() => onTaskTypeChange(TaskType.TESTNET)}
            className={`flex items-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-all justify-center ${
              newTaskType === TaskType.TESTNET
                ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <TestTube className="w-4 h-4" />
            Testnet
          </button>
        </div>
      </div>

      {/* Task Status Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          value={newTaskStatus}
          onChange={(e) => onTaskStatusChange(e.target.value as TaskStatus)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
          <option value={TaskStatus.EARLY}>Early</option>
          <option value={TaskStatus.ONGOING}>Ongoing</option>
          <option value={TaskStatus.ENDED}>Ended</option>
        </select>
      </div>

      {/* Link Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <LinkIcon className="w-4 h-4 inline mr-1" />
          Link (optional)
        </label>
        <input
          type="url"
          value={newTaskLink}
          onChange={(e) => onTaskLinkChange(e.target.value)}
          placeholder="https://example.com or example.com"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            newTaskLink && !isValidUrl(newTaskLink)
              ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400'
          }`}
        />
        {newTaskLink && !isValidUrl(newTaskLink) && (
          <p className="text-red-600 dark:text-red-400 text-xs mt-1">Please enter a valid URL</p>
        )}
      </div>

      {/* Description Input - Now Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <FileText className="w-4 h-4 inline mr-1" />
          Description/Instructions *
        </label>
        <textarea
          value={newTaskDescription}
          onChange={(e) => onTaskDescriptionChange(e.target.value)}
          placeholder="Add detailed instructions or notes..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!newTask.trim() || !newTaskDescription.trim() || (newTaskLink && !isValidUrl(newTaskLink))}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    </form>
  );
};