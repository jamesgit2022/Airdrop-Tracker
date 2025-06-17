import React from 'react';
import { TaskInputForm } from './TaskInputForm';
import { TaskType, TaskStatus } from '../types/Task';

interface TaskInputModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export const TaskInputModal: React.FC<TaskInputModalProps> = ({
  isOpen,
  onClose,
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
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <TaskInputForm
          newTask={newTask}
          newTaskType={newTaskType}
          newTaskStatus={newTaskStatus}
          newTaskLink={newTaskLink}
          newTaskDescription={newTaskDescription}
          onTaskChange={onTaskChange}
          onTaskTypeChange={onTaskTypeChange}
          onTaskStatusChange={onTaskStatusChange}
          onTaskLinkChange={onTaskLinkChange}
          onTaskDescriptionChange={onTaskDescriptionChange}
          onAddTask={onAddTask}
          onClose={onClose}
        />
      </div>
    </div>
  );
};