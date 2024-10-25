import { Todo } from '../TodoTypes';

// Helper function to get start of day in local timezone
const getStartOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const isToday = (date: Date): boolean => {
  const today = getStartOfDay(new Date());
  const compareDate = getStartOfDay(new Date(date));
  return compareDate.getTime() === today.getTime();
};

export const isThisWeek = (date: Date): boolean => {
  const today = new Date();
  const startOfWeek = getStartOfDay(new Date(today));
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const endOfWeek = getStartOfDay(new Date(startOfWeek));
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  const compareDate = getStartOfDay(new Date(date));
  return compareDate >= startOfWeek && compareDate <= endOfWeek;
};

export const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  const compareDate = new Date(date);
  return compareDate.getMonth() === today.getMonth() &&
         compareDate.getFullYear() === today.getFullYear();
};

export const groupTodosByDate = (todos: Todo[]): Record<string, Todo[]> => {
  const grouped: Record<string, Todo[]> = {};
  
  todos.forEach(todo => {
    const date = new Date(todo.date);
    // Create a date key in ISO format (YYYY-MM-DD)
    const dateKey = date.toISOString().split('T')[0];
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(todo);
  });
  
  return grouped;
};

// Helper function to format dates consistently throughout the app
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
};
