import { format, addDays } from 'date-fns';
import { GameDateType } from '../types/scoreboardTypes';

export const formatNextDay = (currentDay: string): string =>
  format(addDays(new Date(currentDay), 1), 'yyyy-MM-dd');

export const currentDay = format(new Date(), 'yyyy-MM-dd');

export const nextDay = formatNextDay(currentDay);

export const formatDatesInGameDateSlide = (gamesDates: string[]): GameDateType[] =>
  gamesDates.map((gameDate) => {
    const [weekDay, monthDay] = format(new Date(gameDate), 'E-MMM dd').split('-');
    return { weekDay, monthDay };
  });

export const formatGameStartTime = (date: string): string =>
  format(new Date(date), 'HH:mm');