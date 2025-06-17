export const formatTime = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getTimeUntilCustomReset = (resetHour: number = 0, resetMinute: number = 0): number => {
  const now = new Date();
  const resetTime = new Date();
  resetTime.setHours(resetHour, resetMinute, 0, 0);
  
  // If the reset time has already passed today, set it for tomorrow
  if (resetTime.getTime() <= now.getTime()) {
    resetTime.setDate(resetTime.getDate() + 1);
  }
  
  return resetTime.getTime() - now.getTime();
};

// Keep the old function for backward compatibility
export const getTimeUntilMidnight = (): number => {
  return getTimeUntilCustomReset(0, 0);
};

export const getTodayDateString = (): string => {
  return new Date().toDateString();
};

export const shouldResetDailyTasks = (
  lastResetDate: string, 
  resetHour: number = 0, 
  resetMinute: number = 0
): boolean => {
  if (!lastResetDate) return true;
  
  const now = new Date();
  const lastReset = new Date(lastResetDate);
  
  // Create reset time for today
  const todayReset = new Date();
  todayReset.setHours(resetHour, resetMinute, 0, 0);
  
  // Create reset time for yesterday
  const yesterdayReset = new Date(todayReset);
  yesterdayReset.setDate(yesterdayReset.getDate() - 1);
  
  // If current time is after today's reset time and last reset was before today's reset time
  if (now >= todayReset && lastReset < todayReset) {
    return true;
  }
  
  // If current time is before today's reset time and last reset was before yesterday's reset time
  if (now < todayReset && lastReset < yesterdayReset) {
    return true;
  }
  
  return false;
};

export const getResetDateString = (resetHour: number = 0, resetMinute: number = 0): string => {
  const now = new Date();
  const resetTime = new Date();
  resetTime.setHours(resetHour, resetMinute, 0, 0);
  
  // If current time is before reset time, use yesterday's date
  if (now < resetTime) {
    resetTime.setDate(resetTime.getDate() - 1);
  }
  
  return resetTime.toDateString();
};