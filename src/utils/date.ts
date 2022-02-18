import { format, addDays } from 'date-fns';

export const formatNextDay = (currentDay: string): string =>
  format(addDays(new Date(currentDay), 1), 'yyyy-MM-dd');

export const currentDay = format(new Date(), 'yyyy-MM-dd');

export const nextDay = formatNextDay(currentDay);
