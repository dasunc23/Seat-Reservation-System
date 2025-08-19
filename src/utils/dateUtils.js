import { format, addDays, startOfDay, endOfDay, isPast, isToday } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const getNextDays = (count = 7) => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    days.push(addDays(today, i));
  }
  
  return days;
};

export const isDatePast = (date) => {
  return isPast(endOfDay(new Date(date)));
};

export const isDateToday = (date) => {
  return isToday(new Date(date));
};

export const getStartOfDay = (date) => {
  return startOfDay(new Date(date));
};

export const getEndOfDay = (date) => {
  return endOfDay(new Date(date));
};