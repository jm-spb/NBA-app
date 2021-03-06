import { format, addDays, addYears } from 'date-fns';
import { IGameDate } from '../types/scoreboardTypes';

export const formatNextDay = (currentDay: string): string =>
  format(addDays(new Date(currentDay), 1), 'yyyy-MM-dd');

export const initialCurrentDay = format(new Date(), 'yyyy-MM-dd');
export const initialNextDay = formatNextDay(initialCurrentDay);

export const formatDatesInGameDateSlide = (gamesDates: string[]): IGameDate[] =>
  gamesDates.map((gameDate) => {
    const [weekDay, monthDay] = format(new Date(gameDate), 'E-MMM dd').split('-');
    return { weekDay, monthDay };
  });

export const formatGameStartTime = (date: string): string =>
  format(new Date(date), 'HH:mm');

export const formatYearsInStandingsPicker = (): string => {
  const currentYear = format(new Date(), 'yyyy');
  const nextYear = format(addYears(new Date(), 1), 'yyyy');
  return `${currentYear}-${nextYear}`;
};
