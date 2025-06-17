import React from 'react';
import { Calendar, StickyNote, Users, TestTube } from 'lucide-react';
import { Task, TaskType, ActiveTab, EditingTaskData } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  activeTab: ActiveTab;
  editingTask: string | null;
  editingTaskData: EditingTaskData;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onStartEditing: (id: string, taskData: EditingTaskData) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditingTaskDataChange: (data: EditingTaskData) => void;
  onRequestConfirmComplete: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeTab,
  editingTask,
  editingTaskData,
  onToggleTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onEditingTaskDataChange,
  onRequestConfirmComplete
}) => {
  const getTabInfo = (tab: ActiveTab) => {
    switch (tab) {
      case 'daily':
        return { icon: Calendar, label: 'daily' };
      case 'note':
        return { icon: StickyNote, label: 'task only' };
      case 'waitlist':
        return { icon: Users, label: 'waitlist' };
      case 'testnet':
        return { icon: TestTube, label: 'testnet' };
      default:
        return { icon: Calendar, label: 'unknown' };
    }
  };

  if (tasks.length === 0) {
    const tabInfo = getTabInfo(activeTab);
    const TabIcon = tabInfo.icon;
    
    return (
      <div className="text-center py-12 dark:text-gray-300">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <TabIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
          No {tabInfo.label} tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Add your first {tabInfo.label} task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTask === task.id}
          editingTaskData={editingTaskData}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onStartEdit={onStartEditing}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onEditingTaskDataChange={onEditingTaskDataChange}
          onRequestConfirmComplete={onRequestConfirmComplete}
        />
      ))}
    </div>
  );
};