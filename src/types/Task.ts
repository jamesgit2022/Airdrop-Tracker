export interface Task {
  id: string;
  text: string;
  completed: boolean;
  type: TaskType;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
  link?: string;
  description?: string;
}

export enum TaskType {
  DAILY = 'daily',
  NOTE = 'note',
  WAITLIST = 'waitlist',
  TESTNET = 'testnet',
  SOCIAL_LINKS = 'social_links'
}

export enum TaskStatus {
  EARLY = 'early',
  ONGOING = 'ongoing',
  ENDED = 'ended'
}

export type ActiveTab = 'daily' | 'note' | 'waitlist' | 'testnet' | 'social_links';

export type SortOption = 'none' | 'title-asc' | 'title-desc' | 'completed' | 'uncompleted';

export interface EditingTaskData {
  text: string;
  link: string;
  description: string;
  status: TaskStatus;
}