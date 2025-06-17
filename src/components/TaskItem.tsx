import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, StickyNote, X, Save, ExternalLink, FileText, Eye, Clock, Users, TestTube } from 'lucide-react';
import { Task, TaskType, TaskStatus, EditingTaskData } from '../types/Task';

interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  editingTaskData: EditingTaskData;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string, taskData: EditingTaskData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditingTaskDataChange: (data: EditingTaskData) => void;
  onRequestConfirmComplete: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  editingTaskData,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditingTaskDataChange,
  onRequestConfirmComplete
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEdit();
  };

  const handleToggleClick = () => {
    if (task.type === TaskType.DAILY && !task.completed) {
      onRequestConfirmComplete(task);
    } else if (task.type === TaskType.NOTE) {
      onToggle(task.id);
    }
    // For completed daily tasks, do nothing (cannot uncheck)
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatLink = (link: string) => {
    if (!link) return '';
    return link.startsWith('http') ? link : `https://${link}`;
  };

  const isValidUrl = (url: string) => {
    if (!url.trim()) return true;
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const getTaskTypeInfo = (type: TaskType) => {
    switch (type) {
      case TaskType.DAILY:
        return { icon: Calendar, label: 'Daily', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' };
      case TaskType.NOTE:
        return { icon: StickyNote, label: 'Task Only', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' };
      case TaskType.WAITLIST:
        return { icon: Users, label: 'Waitlist', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400' };
      case TaskType.TESTNET:
        return { icon: TestTube, label: 'Testnet', color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' };
      default:
        return { icon: Calendar, label: 'Unknown', color: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400' };
    }
  };

  const getStatusInfo = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.EARLY:
        return { label: 'Early', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' };
      case TaskStatus.ONGOING:
        return { label: 'Ongoing', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' };
      case TaskStatus.ENDED:
        return { label: 'Ended', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400' };
    }
  };

  const canToggle = task.type === TaskType.NOTE || (task.type === TaskType.DAILY && !task.completed);
  const taskTypeInfo = getTaskTypeInfo(task.type);
  const statusInfo = getStatusInfo(task.status);
  const TaskTypeIcon = taskTypeInfo.icon;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleClick}
            disabled={!canToggle}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : canToggle
                ? 'border-gray-300 hover:border-green-400'
                : 'border-gray-200 cursor-not-allowed opacity-50'
            }`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  type="text"
                  value={editingTaskData.text}
                  onChange={(e) => onEditingTaskDataChange({ ...editingTaskData, text: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Task title"
                  required
                />
                
                <select
                  value={editingTaskData.status}
                  onChange={(e) => onEditingTaskDataChange({ ...editingTaskData, status: e.target.value as TaskStatus })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value={TaskStatus.EARLY}>Early</option>
                  <option value={TaskStatus.ONGOING}>Ongoing</option>
                  <option value={TaskStatus.ENDED}>Ended</option>
                </select>
                
                <input
                  type="url"
                  value={editingTaskData.link}
                  onChange={(e) => onEditingTaskDataChange({ ...editingTaskData, link: e.target.value })}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    editingTaskData.link && !isValidUrl(editingTaskData.link)
                      ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                  placeholder="Link (optional)"
                />
                
                <textarea
                  value={editingTaskData.description}
                  onChange={(e) => onEditingTaskDataChange({ ...editingTaskData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
                  placeholder="Description (optional)"
                  rows={3}
                />
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!editingTaskData.text.trim() || (editingTaskData.link && !isValidUrl(editingTaskData.link))}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                {/* Task Title and Type */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {task.text}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${taskTypeInfo.color}`}>
                    <TaskTypeIcon className="w-3 h-3" />
                    {taskTypeInfo.label}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Link */}
                {task.link && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <a
                      href={formatLink(task.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm break-all"
                    >
                      {task.link}
                    </a>
                  </div>
                )}

                {/* Description */}
                {task.description && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Description:</span>
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`text-sm text-gray-600 ${
                      showFullDescription ? '' : 'line-clamp-2'
                    }`}>
                      {showFullDescription ? (
                        <div className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
                          {task.description}
                        </div>
                      ) : (
                        <p className="truncate">{task.description}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Added: {formatTimestamp(task.createdAt)}</span>
                  </div>
                  {task.type === TaskType.DAILY && task.completedAt && (
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Last Completed: {formatTimestamp(task.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-1">
              <button
                onClick={() => onStartEdit(task.id, {
                  text: task.text,
                  status: task.status,
                  link: task.link || '',
                  description: task.description || ''
                })}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};