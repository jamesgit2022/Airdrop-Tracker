import React from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { TaskInputModal } from './components/TaskInputModal';
import { SearchAndSort } from './components/SearchAndSort';
import { TaskList } from './components/TaskList';
import { Stats } from './components/Stats';
import { ConfirmationModal } from './components/ConfirmationModal';
import { TaskCompletionModal } from './components/TaskCompletionModal';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const { theme } = useTheme();
  const {
    // State
    tasks,
    activeTab,
    newTask,
    newTaskType,
    newTaskStatus,
    newTaskLink,
    newTaskDescription,
    showTaskInput,
    showSettingsModal,
    showDeleteModal,
    showConfirmCompleteModal,
    editingTask,
    editingTaskData,
    timeUntilReset,
    customResetTime,
    searchQuery,
    sortOption,
    taskToConfirmComplete,
    
    // Computed values
    dailyTasks,
    noteTasks,
    waitlistTasks,
    testnetTasks,
    dailyCompletionRate,
    noteCompletionRate,
    waitlistCompletionRate,
    testnetCompletionRate,
    dailyStreak,
    noteStreak,
    waitlistStreak,
    testnetStreak,
    
    // Actions
    setActiveTab,
    setNewTask,
    setNewTaskType,
    setNewTaskStatus,
    setNewTaskLink,
    setNewTaskDescription,
    setShowTaskInput,
    setShowDeleteModal,
    setShowSettingsModal,
    setEditingTaskData,
    setSearchQuery,
    setSortOption,
    resetDailyTasks,
    saveResetTime,
    exportTasksData,
    importTasksData,
    addTask,
    toggleTask,
    deleteTask,
    confirmDelete,
    startEditing,
    saveEdit,
    cancelEdit,
    requestConfirmComplete,
    confirmCompleteTask,
    cancelConfirmComplete
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          onOpenSettings={() => setShowSettingsModal(true)}
          dailyCompletionRate={dailyCompletionRate}
          dailyStreak={dailyStreak}
          timeUntilReset={timeUntilReset}
        />
        
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          dailyCount={dailyTasks.length}
          noteCount={noteTasks.length}
          waitlistCount={waitlistTasks.length}
          testnetCount={testnetTasks.length}
        />
        
        {/* Stats - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <Stats
            activeTab={activeTab}
            dailyCompletionRate={dailyCompletionRate}
            noteCompletionRate={noteCompletionRate}
            waitlistCompletionRate={waitlistCompletionRate}
            testnetCompletionRate={testnetCompletionRate}
            dailyStreak={dailyStreak}
            noteStreak={noteStreak}
            waitlistStreak={waitlistStreak}
            testnetStreak={testnetStreak}
            timeUntilReset={timeUntilReset}
          />
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShowTaskInput(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-all font-medium shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </button>
        </div>
        
        <TaskInputModal
          isOpen={showTaskInput}
          onClose={() => setShowTaskInput(false)}
          newTask={newTask}
          newTaskType={newTaskType}
          newTaskStatus={newTaskStatus}
          newTaskLink={newTaskLink}
          newTaskDescription={newTaskDescription}
          onTaskChange={setNewTask}
          onTaskTypeChange={setNewTaskType}
          onTaskStatusChange={setNewTaskStatus}
          onTaskLinkChange={setNewTaskLink}
          onTaskDescriptionChange={setNewTaskDescription}
          onAddTask={addTask}
        />
        
        <SearchAndSort
          searchQuery={searchQuery}
          sortOption={sortOption}
          onSearchChange={setSearchQuery}
          onSortChange={setSortOption}
        />
        
        <TaskList
          tasks={tasks}
          activeTab={activeTab}
          editingTask={editingTask}
          editingTaskData={editingTaskData}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onStartEditing={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onEditingTaskDataChange={setEditingTaskData}
          onRequestConfirmComplete={requestConfirmComplete}
        />
        
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          theme={theme}
          currentResetHour={customResetTime.hour}
          currentResetMinute={customResetTime.minute}
          onSaveResetTime={saveResetTime}
          onExportData={exportTasksData}
          onImportData={importTasksData}
        />
        
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          variant="danger"
        />
        
        <TaskCompletionModal
          isOpen={showConfirmCompleteModal}
          task={taskToConfirmComplete}
          onConfirm={confirmCompleteTask}
          onCancel={cancelConfirmComplete}
        />
      </div>
    </div>
  );
}

export default App;