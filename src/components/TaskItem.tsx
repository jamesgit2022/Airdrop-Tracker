import { useState, useEffect, useCallback } from 'react';
import { Task, TaskType, TaskStatus, ActiveTab, SortOption, EditingTaskData } from '../types/Task';
import { 
  loadTasks, 
  saveTasks, 
  getLastResetDate, 
  setLastResetDate,
  loadCustomResetTime,
  saveCustomResetTime,
  getAllTasksForExport,
  setAllTasksFromImport,
  CustomResetTime
} from '../utils/localStorage';
import { 
  getTodayDateString, 
  shouldResetDailyTasks, 
  getTimeUntilCustomReset,
  getResetDateString
} from '../utils/dateUtils';

export const useTasks = () => {
  // Initialize tasks state with data from localStorage immediately
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedResetTime = loadCustomResetTime();
    const savedTasks = loadTasks();
    const lastResetDate = getLastResetDate();
    
    if (shouldResetDailyTasks(lastResetDate, savedResetTime.hour, savedResetTime.minute)) {
      // Automatically reset daily tasks without showing modal
      const resetTasks = savedTasks.map(task => 
        task.type === TaskType.DAILY 
          ? { ...task, completed: false, completedAt: undefined }
          : task
      );
      setLastResetDate(getResetDateString(savedResetTime.hour, savedResetTime.minute));
      return resetTasks;
    } else {
      return savedTasks;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('daily');
  const [newTask, setNewTask] = useState('');
  const [newTaskType, setNewTaskType] = useState<TaskType>(TaskType.DAILY);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.EARLY);
  const [newTaskLink, setNewTaskLink] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmCompleteModal, setShowConfirmCompleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [taskToConfirmComplete, setTaskToConfirmComplete] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingTaskData, setEditingTaskData] = useState<EditingTaskData>({ text: '', link: '', socialLink: '', description: '', status: TaskStatus.EARLY });
  const [customResetTime, setCustomResetTime] = useState<CustomResetTime>({ hour: 0, minute: 0 });
  const [timeUntilReset, setTimeUntilReset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('none');

  // Load custom reset time and set up timer
  useEffect(() => {
    const savedResetTime = loadCustomResetTime();
    setCustomResetTime(savedResetTime);
    setTimeUntilReset(getTimeUntilCustomReset(savedResetTime.hour, savedResetTime.minute));
  }, []);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilReset(getTimeUntilCustomReset(customResetTime.hour, customResetTime.minute));
    }, 1000);

    return () => clearInterval(timer);
  }, [customResetTime]);

  // Save tasks whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const resetDailyTasks = useCallback(() => {
    const savedTasks = loadTasks();
    const resetTasks = savedTasks.map(task => 
      task.type === TaskType.DAILY 
        ? { ...task, completed: false, completedAt: undefined }
        : task
    );
    
    setTasks(resetTasks);
    setLastResetDate(getResetDateString(customResetTime.hour, customResetTime.minute));
  }, [customResetTime]);

  const saveResetTime = useCallback((hour: number, minute: number) => {
    const newResetTime = { hour, minute };
    setCustomResetTime(newResetTime);
    saveCustomResetTime(newResetTime);
    setTimeUntilReset(getTimeUntilCustomReset(hour, minute));
  }, []);

  const exportTasksData = useCallback(() => {
    try {
      const allTasks = getAllTasksForExport();
      const exportData = {
        tasks: allTasks,
        customResetTime,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting tasks:', error);
      alert('Failed to export tasks. Please try again.');
    }
  }, [customResetTime]);

  const importTasksData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importData = JSON.parse(content);
        
        // Validate import data structure
        if (!importData || typeof importData !== 'object') {
          throw new Error('Invalid file format');
        }
        
        let tasksToImport: Task[] = [];
        let resetTimeToImport: CustomResetTime | null = null;
        
        // Handle different export formats
        if (Array.isArray(importData)) {
          // Old format: just an array of tasks
          tasksToImport = importData;
        } else if (importData.tasks && Array.isArray(importData.tasks)) {
          // New format: object with tasks and settings
          tasksToImport = importData.tasks;
          if (importData.customResetTime) {
            resetTimeToImport = importData.customResetTime;
          }
        } else {
          throw new Error('No valid tasks found in file');
        }
        
        // Validate tasks structure
        const isValidTask = (task: any): task is Task => {
          return task &&
            typeof task.id === 'string' &&
            typeof task.text === 'string' &&
            typeof task.completed === 'boolean' &&
            (task.type === TaskType.DAILY || task.type === TaskType.NOTE || task.type === TaskType.WAITLIST || task.type === TaskType.TESTNET) &&
            typeof task.createdAt === 'number';
        };
        
        if (!tasksToImport.every(isValidTask)) {
          throw new Error('Invalid task data structure');
        }
        
        // Add default status to tasks that don't have it (for backward compatibility)
        const tasksWithStatus = tasksToImport.map(task => ({
          ...task,
          status: task.status || TaskStatus.EARLY
        }));
        
        // Import tasks
        setAllTasksFromImport(tasksWithStatus);
        setTasks(tasksWithStatus);
        
        // Import reset time if available
        if (resetTimeToImport) {
          saveResetTime(resetTimeToImport.hour, resetTimeToImport.minute);
        }
        
        alert(`Successfully imported ${tasksWithStatus.length} tasks!`);
      } catch (error) {
        console.error('Error importing tasks:', error);
        alert('Failed to import tasks. Please check the file format and try again.');
      }
    };
    
    reader.onerror = () => {
      alert('Failed to read the file. Please try again.');
    };
    
    reader.readAsText(file);
    
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  }, [saveResetTime]);

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        type: newTaskType,
        status: newTaskStatus,
        createdAt: Date.now(),
        link: newTaskLink.trim() || undefined,
        description: newTaskDescription.trim() || undefined
      };
      
      setTasks(prev => [...prev, task]);
      setNewTask('');
      setNewTaskStatus(TaskStatus.EARLY);
      setNewTaskLink('');
      setNewTaskDescription('');
      setShowTaskInput(false);
    }
  }, [newTask, newTaskType, newTaskStatus, newTaskLink, newTaskDescription]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? Date.now() : undefined
          }
        : task
    ));
  }, []);

  const requestConfirmComplete = useCallback((task: Task) => {
    setTaskToConfirmComplete(task);
    setShowConfirmCompleteModal(true);
  }, []);

  const confirmCompleteTask = useCallback(() => {
    if (taskToConfirmComplete) {
      toggleTask(taskToConfirmComplete.id);
      setTaskToConfirmComplete(null);
    }
    setShowConfirmCompleteModal(false);
  }, [taskToConfirmComplete, toggleTask]);

  const cancelConfirmComplete = useCallback(() => {
    setTaskToConfirmComplete(null);
    setShowConfirmCompleteModal(false);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
    }
    setShowDeleteModal(false);
  }, [taskToDelete]);

  const startEditing = useCallback((id: string, taskData: EditingTaskData) => {
    setEditingTask(id);
    setEditingTaskData(taskData);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingTask && editingTaskData.text.trim()) {
      setTasks(prev => prev.map(task => 
        task.id === editingTask 
          ? { 
              ...task, 
              text: editingTaskData.text.trim(),
              status: editingTaskData.status,
              link: editingTaskData.link.trim() || undefined,
              socialLink: editingTaskData.socialLink.trim() || undefined,
              description: editingTaskData.description.trim() || undefined
            }
          : task
      ));
    }
    setEditingTask(null);
    setEditingTaskData({ text: '', link: '', socialLink: '', description: '', status: TaskStatus.EARLY });
  }, [editingTask, editingTaskData]);

  const cancelEdit = useCallback(() => {
    setEditingTask(null);
    setEditingTaskData({ text: '', link: '', socialLink: '', description: '', status: TaskStatus.EARLY });
  }, []);

  // Filter and sort tasks
  const getFilteredAndSortedTasks = useCallback(() => {
    let filtered = tasks.filter(task => task.type === activeTab);
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.text.toLowerCase().includes(query) ||
        (task.link && task.link.toLowerCase().includes(query)) ||
        (task.socialLink && task.socialLink.toLowerCase().includes(query)) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }
    
    // Apply completion status filter based on sort option
    if (sortOption === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (sortOption === 'uncompleted') {
      filtered = filtered.filter(task => !task.completed);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'title-asc':
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.text.localeCompare(a.text));
        break;
      case 'completed':
        // No additional sorting needed since we already filtered for completed tasks
        break;
      case 'uncompleted':
        // No additional sorting needed since we already filtered for uncompleted tasks
        break;
      default:
        // No sorting
        break;
    }
    
    return filtered;
  }, [tasks, activeTab, searchQuery, sortOption]);

  // Computed values
  const filteredTasks = getFilteredAndSortedTasks();
  const dailyTasks = tasks.filter(task => task.type === TaskType.DAILY);
  const noteTasks = tasks.filter(task => task.type === TaskType.NOTE);
  const waitlistTasks = tasks.filter(task => task.type === TaskType.WAITLIST);
  const testnetTasks = tasks.filter(task => task.type === TaskType.TESTNET);
  
  const dailyCompletedCount = dailyTasks.filter(task => task.completed).length;
  const noteCompletedCount = noteTasks.filter(task => task.completed).length;
  const waitlistCompletedCount = waitlistTasks.filter(task => task.completed).length;
  const testnetCompletedCount = testnetTasks.filter(task => task.completed).length;
  
  const dailyCompletionRate = dailyTasks.length > 0 
    ? Math.round((dailyCompletedCount / dailyTasks.length) * 100) 
    : 0;
  const noteCompletionRate = noteTasks.length > 0 
    ? Math.round((noteCompletedCount / noteTasks.length) * 100) 
    : 0;
  const waitlistCompletionRate = waitlistTasks.length > 0 
    ? Math.round((waitlistCompletedCount / waitlistTasks.length) * 100) 
    : 0;
  const testnetCompletionRate = testnetTasks.length > 0 
    ? Math.round((testnetCompletedCount / testnetTasks.length) * 100) 
    : 0;

  // Calculate streaks
  const calculateDailyStreak = useCallback(() => {
    const completedDailyTasks = dailyTasks.filter(task => task.completed);
    return completedDailyTasks.length;
  }, [dailyTasks]);

  const calculateNoteStreak = useCallback(() => {
    const completedNoteTasks = noteTasks.filter(task => task.completed);
    return completedNoteTasks.length;
  }, [noteTasks]);

  const calculateWaitlistStreak = useCallback(() => {
    const completedWaitlistTasks = waitlistTasks.filter(task => task.completed);
    return completedWaitlistTasks.length;
  }, [waitlistTasks]);

  const calculateTestnetStreak = useCallback(() => {
    const completedTestnetTasks = testnetTasks.filter(task => task.completed);
    return completedTestnetTasks.length;
  }, [testnetTasks]);

  return {
    // State
    tasks: filteredTasks,
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
    dailyCompletedCount,
    noteCompletedCount,
    waitlistCompletedCount,
    testnetCompletedCount,
    dailyCompletionRate,
    noteCompletionRate,
    waitlistCompletionRate,
    testnetCompletionRate,
    dailyStreak: calculateDailyStreak(),
    noteStreak: calculateNoteStreak(),
    waitlistStreak: calculateWaitlistStreak(),
    testnetStreak: calculateTestnetStreak(),
    
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
  };
};