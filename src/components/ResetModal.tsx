import React from 'react';
import { Calendar, RefreshCw, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onReset: () => void;
  onSkip: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onReset,
  onSkip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">New Day Started!</h3>
            <p className="text-sm text-gray-600">It's time to reset your daily tasks</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Daily Reset Available</span>
          </div>
          <p className="text-blue-700 text-sm">
            Your daily tasks can be reset to start fresh for today. Note tasks will remain unchanged.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Keep Current State
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Reset Daily Tasks
          </button>
        </div>
      </div>
    </div>
  );
};