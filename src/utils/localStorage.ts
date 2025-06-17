import { Task } from '../types/Task';

const TASKS_KEY = 'daily-task-tracker-tasks';
const LAST_RESET_KEY = 'daily-task-tracker-last-reset';
const CUSTOM_RESET_TIME_KEY = 'daily-task-tracker-custom-reset-time';

export const loadTasks = (): Task[] => {
  try {
    console.log('🔍 Loading tasks from localStorage...');
    const saved = localStorage.getItem(TASKS_KEY);
    console.log('📦 Raw data from localStorage:', saved);
    
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('✅ Parsed tasks:', parsed);
      console.log('📊 Number of tasks loaded:', parsed.length);
      return parsed;
    } else {
      console.log('⚠️ No saved tasks found in localStorage');
      return [];
    }
  } catch (error) {
    console.error('❌ Error loading tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    console.log('💾 Saving tasks to localStorage...');
    console.log('📝 Tasks to save:', tasks);
    console.log('📊 Number of tasks to save:', tasks.length);
    
    const stringified = JSON.stringify(tasks);
    console.log('🔗 Stringified tasks:', stringified);
    
    localStorage.setItem(TASKS_KEY, stringified);
    console.log('✅ Tasks saved successfully to localStorage');
    
    // Verify the save worked
    const verification = localStorage.getItem(TASKS_KEY);
    console.log('🔍 Verification - data in localStorage after save:', verification);
  } catch (error) {
    console.error('❌ Error saving tasks:', error);
  }
};

export const getLastResetDate = (): string => {
  const date = localStorage.getItem(LAST_RESET_KEY) || '';
  console.log('📅 Last reset date from localStorage:', date);
  return date;
};

export const setLastResetDate = (date: string): void => {
  console.log('📅 Setting last reset date:', date);
  localStorage.setItem(LAST_RESET_KEY, date);
};

export interface CustomResetTime {
  hour: number;
  minute: number;
}

export const loadCustomResetTime = (): CustomResetTime => {
  try {
    console.log('⏰ Loading custom reset time...');
    const saved = localStorage.getItem(CUSTOM_RESET_TIME_KEY);
    console.log('⏰ Raw reset time data:', saved);
    
    if (saved) {
      const parsed = JSON.parse(saved);
      const resetTime = {
        hour: Math.max(0, Math.min(23, parsed.hour || 0)),
        minute: Math.max(0, Math.min(59, parsed.minute || 0))
      };
      console.log('⏰ Loaded reset time:', resetTime);
      return resetTime;
    }
  } catch (error) {
    console.error('❌ Error loading custom reset time:', error);
  }
  console.log('⏰ Using default reset time: midnight');
  return { hour: 0, minute: 0 }; // Default to midnight
};

export const saveCustomResetTime = (resetTime: CustomResetTime): void => {
  try {
    console.log('⏰ Saving custom reset time:', resetTime);
    localStorage.setItem(CUSTOM_RESET_TIME_KEY, JSON.stringify(resetTime));
    console.log('✅ Reset time saved successfully');
  } catch (error) {
    console.error('❌ Error saving custom reset time:', error);
  }
};

export const getAllTasksForExport = (): Task[] => {
  console.log('📤 Getting all tasks for export...');
  const tasks = loadTasks();
  console.log('📤 Tasks for export:', tasks);
  return tasks;
};

export const setAllTasksFromImport = (tasks: Task[]): void => {
  try {
    console.log('📥 Importing tasks:', tasks);
    console.log('📥 Number of tasks to import:', tasks.length);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    console.log('✅ Tasks imported successfully');
  } catch (error) {
    console.error('❌ Error importing tasks:', error);
    throw new Error('Failed to import tasks');
  }
};